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

			/**
			 * Get random data from the server in order to create a roll table.
			 *
			 * @param {string} type Type of data.
			 * @param {number} limit Number of records to retrieve.
			 */
			const getDataPromise = async ( type, limit = 1 ) => {
				try {
					return await getCharacterData( {
						moral: alignmentData.moral,
						ethic: alignmentData.ethic,
						race: raceData?.inherit
							? raceData.inherit.concat( [ race ] )
							: race,
						gender: gender !== 'nonbinary' ? gender : 'any',
						type,
						limit,
					} )
						.then( ( { data: sourceData } ) => {
							const dataList =
								sourceData?.characterData?.nodes || [];

							return Promise.resolve(
								dataList.map( ( { content, author } ) => {
									return {
										content: stripHtml( content ).result,
										author: author?.node?.name || '',
									};
								} )
							);
						} )
						.catch( () => {
							return Promise.resolve( [] );
						} );
				} catch {
					return Promise.resolve( [] );
				}
			};

			const generateRollTable = (
				sourceData = [],
				content,
				size = 20
			) => {
				return [ ...new Array( size ) ].map( ( _item, index ) => {
					return sourceData[ index ]
						? sourceData[ index ]
						: {
								content:
									typeof content === 'function'
										? content()
										: content,
								author: '',
						  };
				} );
			};

			/**
			 * Returns an array of promises which resolve with data. Some use the API, some come from the client.
			 */
			const callbacks = {
				name: () =>
					getDataPromise( 'name', 20 ).then( ( data ) =>
						randomItem(
							generateRollTable(
								data,
								() => generateName( race, gender ),
								40
							)
						)
					),
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
				feature: () =>
					getDataPromise( 'feature' ).then( ( data ) =>
						randomItem( data )
					),

				voice: () =>
					getDataPromise( 'voice' ).then( ( data ) =>
						randomItem( data )
					),
				plotHook: () =>
					getDataPromise( 'plotHook' ).then( ( data ) =>
						randomItem( data )
					),
				personality: () =>
					getDataPromise( 'trait' ).then( ( data ) =>
						randomItem( data )
					),
				ideal: () =>
					getDataPromise( 'ideal' ).then( ( data ) =>
						randomItem( data )
					),
				bond: () =>
					getDataPromise( 'bond' ).then( ( data ) =>
						randomItem( data )
					),
				flaw: () =>
					getDataPromise( 'flaw' ).then( ( data ) =>
						randomItem( data )
					),
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
