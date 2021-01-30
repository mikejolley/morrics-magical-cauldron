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
	roll,
	randomRace,
	randomAlignment,
	randomGender,
	randomOccupation,
} from './utils';
import {
	races,
	hairColors,
	eyeColors,
	skinColors,
	ageDescriptors,
	skinDescriptors,
	eyeDescriptors,
	weightDescriptors,
	hairDescriptors,
	alignments,
	playerNames,
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

			const getCharacterDataPromise = async ( type ) => {
				return await getCharacterData( {
					moral: [ alignmentData.moral, 'any' ],
					ethic: [ alignmentData.ethic, 'any' ],
					race: raceData?.inherit
						? raceData.inherit.concat( [ race, 'any' ] )
						: [ race, 'any' ],
					gender:
						gender !== 'nonbinary' ? [ gender, 'any' ] : [ 'any' ],
					type,
				} )
					.then( ( { data: sourceData } ) => {
						return Promise.resolve(
							randomItem( sourceData?.characterData?.nodes || [] )
						);
					} )
					.catch( () => {
						return Promise.resolve( '' );
					} );
			};

			/**
			 * Returns an array of promises which resolve with data. Some use the API, some come from the client.
			 */
			const callbacks = {
				name: () =>
					Promise.resolve(
						generateName(
							playerNames,
							race,
							gender === 'nonbinary'
								? randomItem( [ 'male', 'female' ] )
								: gender
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
				height: () => {
					const base = raceData.baseHeight || 4.67;
					const modifier = raceData.heightModifier || '2d10';
					const heightInFeet =
						base + roll.roll( modifier ).result / 12;
					const feet = Math.floor( heightInFeet );
					const inches = Math.round( ( heightInFeet - feet ) * 12 );
					return Promise.resolve( feet + "'" + inches + '"' );
				},
				weight: () =>
					Promise.resolve( randomItem( weightDescriptors ) ),
				appearance: () => {
					// Baldness generation.
					let baldRoll = roll.roll( 'd100' ).result;

					if ( gender === 'female' ) {
						baldRoll += 10;
					}
					if ( age === 'middleAge' ) {
						baldRoll -= 10;
					} else if ( age === 'old' ) {
						baldRoll -= 20;
					} else if ( age === 'venerable' ) {
						baldRoll -= 40;
					}

					const isBald = baldRoll <= 10;
					const hairDescription = isBald
						? `they are bald`
						: `their hair is ${ randomItem(
								raceData.hairColors || hairColors
						  ) } and ${ randomItem( hairDescriptors ) }`;
					const eyeDescriptor = randomItem( eyeDescriptors );
					const eyeColor = randomItem(
						raceData.eyeColors || eyeColors
					);
					const skinDescriptor = randomItem( skinDescriptors );
					const skinColor = randomItem(
						raceData.skinColors || skinColors
					);

					return Promise.resolve(
						`They have ${ skinDescriptor }, ${ skinColor } skin, ${ eyeDescriptor }, ${ eyeColor } eyes, and ${ hairDescription }.`
					);
				},
				abilities: () => Promise.resolve( rollAbilities() ),
				feature: () => getCharacterDataPromise( 'feature' ),
				voice: () => getCharacterDataPromise( 'voice' ),
				plotHook: () => getCharacterDataPromise( 'plotHook' ),
				personality: () => getCharacterDataPromise( 'trait' ),
				ideal: () => getCharacterDataPromise( 'ideal' ),
				bond: () => getCharacterDataPromise( 'bond' ),
				flaw: () => getCharacterDataPromise( 'flaw' ),
			};

			const resolveCallbacks = ( fields = null ) => {
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
						filteredCallbacks[ key ]()
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
