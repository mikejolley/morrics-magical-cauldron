/**
 * External dependencies
 */
import { useCallback } from 'react';
import randomItem from 'random-item';
import { stripHtml } from 'string-strip-html';

/**
 * Internal dependencies
 */
import { useCharacterDataQuery } from 'hooks/queries/use-character-data-query';
import {
	generateName,
	rollAbilities,
	randomRace,
	randomAlignment,
	randomGender,
	randomOccupation,
	generateAppearance,
	generateHeight,
} from './utils';
import {
	races,
	ageDescriptors,
	weightDescriptors,
	alignments,
} from 'shared/data';
import { filterCallbacks, resolveAllCallbacks } from 'shared/utils';

export const useNpcGenerator = () => {
	const getCharacterData = useCharacterDataQuery();
	const getCallbacks = useCallback(
		( {
			race: selectedRace,
			alignment: selectedAlignment,
			gender: selectedGender,
			occupation: selectedOccupation,
			...currentData
		} ) => {
			/**
			 * Randomizes the incoming options if missing or blank -- these options are generated first since other data
			 * may require them. Because other generators rely on these, they cannot be rerolled individually.
			 */
			const race = selectedRace || randomRace();
			const alignment = selectedAlignment || randomAlignment();
			const gender = selectedGender || randomGender();
			const age =
				currentData.age || randomItem( Object.keys( ageDescriptors ) );

			/**
			 * Lookup data objects from the selected or random ID.
			 */
			const raceData = races[ race ];
			const alignmentData = alignments.find(
				( { id } ) => id === alignment
			);

			const characterDataPromise = async ( type, fallback = '' ) => {
				try {
					return await getCharacterData( {
						moral: alignmentData.moral,
						ethic: alignmentData.ethic,
						race: raceData?.inherit
							? raceData.inherit.concat( [ race ] )
							: race,
						gender: gender !== 'nonbinary' ? gender : 'any',
						type,
					} )
						.then( ( { data: sourceData } ) => {
							const randomSourceData = randomItem(
								sourceData?.characterData?.nodes || []
							);

							const returnItem = {
								content: randomSourceData.content || fallback,
								author:
									randomSourceData?.author?.node?.name || '',
							};

							return Promise.resolve( returnItem );
						} )
						.catch( () => {
							return Promise.resolve( { content: fallback } );
						} );
				} catch {
					return Promise.resolve( { content: fallback } );
				}
			};

			/**
			 * Return a resolved promise.
			 *
			 * @param {string} data Data to resolve.
			 * @return {Promise} Resolved promise.
			 */
			const resolve = ( data ) => {
				return Promise.resolve( data );
			};

			/**
			 * Returns an array of promises which resolve with data. Some use the API, some come from the client.
			 */
			const callbacks = {
				name: ( { source = 'user' } ) => {
					const generatedName = generateName( race, gender );

					return source === 'user'
						? characterDataPromise( 'name', generatedName ).then(
								( data ) => {
									data.content = stripHtml(
										data.content
									).result;
									return data;
								}
						  )
						: {
								content: generatedName,
								author: '',
						  };
				},
				gender: () => resolve( gender ),
				race: () => resolve( race ),
				occupation: () =>
					resolve(
						selectedOccupation || randomOccupation( alignment )
					),
				alignment: () => resolve( alignment ),
				age: () => resolve( age ),
				height: () => resolve( generateHeight( { raceData } ) ),
				weight: () => resolve( randomItem( weightDescriptors ) ),
				appearance: () =>
					resolve( generateAppearance( { gender, age, raceData } ) ),
				abilities: () => resolve( rollAbilities( { age } ) ),
				feature: () => characterDataPromise( 'feature' ),
				voice: () => characterDataPromise( 'voice' ),
				plotHook: () => characterDataPromise( 'plotHook' ),
				personality: () => characterDataPromise( 'trait' ),
				ideal: () => characterDataPromise( 'ideal' ),
				bond: () => characterDataPromise( 'bond' ),
				flaw: () => characterDataPromise( 'flaw' ),
			};

			const resolveCallbacks = ( fields = null, options = {} ) =>
				resolveAllCallbacks(
					filterCallbacks( callbacks, fields ),
					options
				);

			return {
				callbacks,
				resolveCallbacks,
			};
		},
		[ getCharacterData ]
	);

	return getCallbacks;
};
