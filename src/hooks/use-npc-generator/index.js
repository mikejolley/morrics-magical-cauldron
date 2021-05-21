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
			age: selectedAge,
		} ) => {
			/**
			 * Randomizes the incoming options if missing or blank -- these options are generated first since other data
			 * may require them. Because other generators rely on these, they cannot be rerolled individually.
			 */
			const race = selectedRace || randomRace();
			const alignment = selectedAlignment || randomAlignment();
			const gender = selectedGender || randomGender();
			const age =
				selectedAge || randomItem( Object.keys( ageDescriptors ) );

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
							return Promise.resolve( {
								content: randomSourceData.content || fallback,
								author:
									randomSourceData?.author?.node?.name || '',
							} );
						} )
						.catch( () => {
							return Promise.resolve( { content: fallback } );
						} );
				} catch {
					return Promise.resolve( { content: fallback } );
				}
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
				gender: () => Promise.resolve( gender ),
				race: () => Promise.resolve( race ),
				occupation: () =>
					Promise.resolve(
						selectedOccupation || randomOccupation( alignment )
					),
				alignment: () => Promise.resolve( alignment ),
				age: () => Promise.resolve( age ),
				height: () => Promise.resolve( generateHeight( { raceData } ) ),
				weight: () =>
					Promise.resolve( randomItem( weightDescriptors ) ),
				appearance: () =>
					Promise.resolve(
						generateAppearance( { gender, age, raceData } )
					),
				abilities: () => Promise.resolve( rollAbilities( { age } ) ),
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
