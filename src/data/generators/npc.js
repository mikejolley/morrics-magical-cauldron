/**
 * External dependencies
 */
import randomItem from 'random-item';
import { useMemo, useRef, useEffect } from 'react';
import { shallowEqualObjects } from 'shallow-equal';

/**
 * Internal dependencies
 */
import { roll, rollAbilities } from '../../utils';
import { generateName } from './utils';

// Fixed descriptors.
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
	occupations,
} from '../constants';

// Database descriptors.
const playerData = require( './playerData.json' );

// race occupation gender
const Generators = ( options = {} ) => {
	const currentOptions = useRef( options );

	useEffect( () => {
		if ( ! shallowEqualObjects( currentOptions.current, options ) ) {
			currentOptions.current = options;
		}
	}, [ options ] );

	const returnGenerators = useMemo( () => {
		const {
			race: selectedRace,
			gender: selectedGender,
			occupation: selectedOccupation,
			alignment: selectedAlignment,
		} = currentOptions.current;

		const race = selectedRace || randomItem( Object.keys( races ) );
		const gender =
			selectedGender ||
			randomItem( [ 'male', 'female', 'male', 'female', 'nonbinary' ] );
		const alignmentId = selectedAlignment || randomItem( alignments ).id;
		const alignment = alignments.find( ( { id } ) => id === alignmentId );
		const occupation =
			selectedOccupation ||
			randomItem(
				randomMultipleAlignments( occupations, alignment ).occupations
			);
		const raceData = races[ race ];
		return {
			name: () => {
				return generateName(
					race,
					gender === 'nonbinary'
						? randomItem( [ 'male', 'female' ] )
						: gender
				);
			},
			gender: () => gender,
			race: () => race,
			occupation: () => occupation,
			alignment: () => alignment,
			age: () => randomItem( ageDescriptors ),
			height: () => {
				const base = raceData.baseHeight || 4.67;
				const modifier = raceData.heightModifier || '2d10';
				const heightInFeet = base + roll.roll( modifier ).result / 12;
				const feet = Math.floor( heightInFeet );
				const inches = Math.round( ( heightInFeet - feet ) * 12 );
				return feet + "'" + inches + '"';
			},
			weight: () => randomItem( weightDescriptors ),
			appearance: () => {
				const eyeColor = randomItem( raceData.eyeColors || eyeColors );
				const hairColor = randomItem(
					raceData.hairColors || hairColors
				);
				const skinColor = randomItem(
					raceData.skinColors || skinColors
				);
				const eyeDescriptor = randomItem( eyeDescriptors );
				const skinDescriptor = randomItem( skinDescriptors );
				const hairDescriptor = randomItem( hairDescriptors );
				return `Their skin is ${ skinColor } and ${ skinDescriptor }, their eyes are ${ eyeColor } and ${ eyeDescriptor }, and they have ${ hairColor } hair that is ${ hairDescriptor }.`;
			},
			abilities: () => rollAbilities(),
			clothing: () =>
				randomItem(
					matchingItems( playerData, 'clothing', alignment )
				),
			distinguishingMark: () =>
				randomItem( matchingItems( playerData, 'mark', alignment ) ),
			voice: () =>
				randomItem( matchingItems( playerData, 'voice', alignment ) ),
			plotHook: () =>
				randomItem(
					matchingItems( playerData, 'plotHook', alignment )
				),
			personality: () =>
				randomItem( matchingItems( playerData, 'trait', alignment ) ),
			ideal: () =>
				randomItem( matchingItems( playerData, 'ideal', alignment ) ),
			bond: () =>
				randomItem( matchingItems( playerData, 'bond', alignment ) ),
			flaw: () =>
				randomItem( matchingItems( playerData, 'flaw', alignment ) ),
		};
	}, [ currentOptions.current ] );

	return returnGenerators;
};

const matchingItems = ( items, type, alignment ) => {
	const matches = playerData.filter( ( item ) => {
		if ( item.type !== type ) {
			return false;
		}
		return (
			( item.moral === 'any' || item.moral === alignment.moral ) &&
			( item.ethic === 'any' || item.ethic === alignment.ethic )
		);
	} );
	return matches;
};

/**
 * Select a random item, but choose another if the alignment conflicts.
 *
 * @param {Array} items List of items.
 * @param {Object} alignment Alignment data.
 * @return {Object|string} Random item.
 */
const randomMultipleAlignments = ( items, alignment ) => {
	if ( ! alignment ) {
		return randomItem( items );
	}
	const filteredItems = items.filter( ( group ) => {
		if ( group.moral && ! group.moral.includes( alignment.moral ) ) {
			return false;
		}
		if ( group.ethic && ! group.ethic.includes( alignment.ethic ) ) {
			return false;
		}
		return true;
	} );

	return randomItem( filteredItems );
};

export default Generators;
