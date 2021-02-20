/**
 * External dependencies
 */
import { useCallback } from 'react';
import randomItem from 'random-item';

/**
 * Internal dependencies
 */
import { useCharacterDataQuery } from '@hooks/queries/use-character-data-query';
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
} from '@shared/data';

export const useGenerator = () => {
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
			 * Randomizes the incoming options if missing or blank -- these options
			 * are generated first since other data may require them.
			 *
			 * Because other generators rely on these, they cannot be rerolled individually.
			 */
			const race = selectedRace || randomRace();
			const alignment = selectedAlignment || randomAlignment();
			const gender = selectedGender || randomGender();
			const age =
				currentData?.age || randomItem( Object.keys( ageDescriptors ) );

			/**
			 * Lookup data objects from the selected or random ID.
			 */
			const raceData = races[ race ];
			const alignmentData = alignments.find(
				( { id } ) => id === alignment
			);

			const getCharacterDataPromise = async ( type, fallback = '' ) => {
				try {
					return await getCharacterData( {
						moral: [ alignmentData.moral, 'any' ],
						ethic: [ alignmentData.ethic, 'any' ],
						race: raceData?.inherit
							? raceData.inherit.concat( [ race, 'any' ] )
							: [ race, 'any' ],
						gender:
							gender !== 'nonbinary'
								? [ gender, 'any' ]
								: [ 'any' ],
						type,
					} )
						.then( ( { data: sourceData } ) => {
							const randomItemFromSource = randomItem(
								sourceData?.characterData?.nodes || []
							);

							const returnItem = {
								content:
									randomItemFromSource.content || fallback,
								author: randomItemFromSource?.author,
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
			 * Returns an array of promises which resolve with data. Some use the API, some come from the client.
			 */
			const callbacks = {
				name: ( { source = 'user' } ) => {
					const generatedName = generateName(
						race,
						gender === 'nonbinary'
							? randomItem( [ 'male', 'female' ] )
							: gender
					);

					if ( source === 'user' ) {
						return getCharacterDataPromise(
							'name',
							generatedName
						).then( ( data ) => {
							data.content = data.content.replace(
								/(<([^>]+)>)/gi,
								''
							);
							return data;
						} );
					}

					return {
						content: generatedName,
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
				abilities: () => Promise.resolve( rollAbilities() ),
				feature: () => getCharacterDataPromise( 'feature' ),
				voice: () => getCharacterDataPromise( 'voice' ),
				plotHook: () => getCharacterDataPromise( 'plotHook' ),
				personality: () => getCharacterDataPromise( 'trait' ),
				ideal: () => getCharacterDataPromise( 'ideal' ),
				bond: () => getCharacterDataPromise( 'bond' ),
				flaw: () => getCharacterDataPromise( 'flaw' ),
			};

			const resolveCallbacks = ( fields = null, options = {} ) => {
				const filteredCallbacks = fields
					? Object.keys( callbacks )
							.filter( ( key ) => fields.includes( key ) )
							.reduce( ( obj, key ) => {
								obj[ key ] = callbacks[ key ];
								return obj;
							}, {} )
					: callbacks;

				return Promise.all(
					Object.keys( filteredCallbacks ).map( ( key ) =>
						filteredCallbacks[ key ]( options )
					)
				).then( ( results ) => {
					const data = {};
					Object.keys( filteredCallbacks ).forEach( ( key, i ) => {
						data[ key ] = results[ i ];
					} );
					return data;
				} );
			};

			return {
				callbacks,
				resolveCallbacks,
			};
		},
		[ getCharacterData ]
	);

	return getCallbacks;
};
