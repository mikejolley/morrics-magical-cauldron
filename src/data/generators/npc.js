import { roll, rollAbilities } from '../../utils';

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
import { playerNames } from '../temp';
import distinguishingMarks from '../distinguishing-marks';
import ideals from '../ideals';
import bonds from '../bonds';
import flaws from '../flaws';
import clothing from '../clothing';
import plotHooks from '../plot-hooks';
import personalityTraits from '../personality-traits';
import voiceDescriptors from '../voice-descriptors';

/**
 * External dependencies
 */
import randomItem from 'random-item';

/**
 * Select a random item, but choose another if the alignment conflicts.
 *
 * @param {Array} items List of items.
 * @param {string} alignment Selected alignment, or empty if it doesn't matter.
 * @return {Object|string} Random item.
 */
const randomItemWithAlignment = ( items, alignment = '' ) => {
	if ( ! alignment ) {
		return randomItem( items );
	}

	let moral = 'neutral';
	let ethic = 'neutral';

	if ( [ 'lg', 'ln', 'le' ].includes( alignment ) ) {
		ethic = 'lawful';
	} else if ( [ 'cg', 'cn', 'ce' ].includes( alignment ) ) {
		ethic = 'chaotic';
	}

	if ( [ 'lg', 'ng', 'cg' ].includes( alignment ) ) {
		moral = 'good';
	} else if ( [ 'le', 'ne', 'ce' ].includes( alignment ) ) {
		moral = 'evil';
	}

	const filteredItems = items.filter( ( group ) => {
		if ( group.moral && ! group.moral.includes( moral ) ) {
			return false;
		}
		if ( group.ethic && ! group.ethic.includes( ethic ) ) {
			return false;
		}
		return true;
	} );

	return randomItem( filteredItems );
};

// race occupation gender
const generators = ( {
	race: selectedRace,
	gender: selectedGender,
	occupation: selectedOccupation,
	alignment: selectedAlignment,
} ) => {
	const race = selectedRace || randomItem( Object.keys( races ) );
	const gender =
		selectedGender ||
		randomItem( [ 'male', 'female', 'male', 'female', 'nonbinary' ] );
	const alignment = selectedAlignment || randomItem( alignments ).id;
	const occupation =
		selectedOccupation ||
		randomItem(
			randomItemWithAlignment( occupations, alignment ).occupations
		);
	const raceData = races[ race ];
	return {
		name: () => randomItem( playerNames ),
		gender: () => gender,
		race: () => race,
		occupation: () => occupation,
		alignment: () => alignments.find( ( { id } ) => alignment === id ),
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
			const hairColor = randomItem( raceData.hairColors || hairColors );
			const skinColor = randomItem( raceData.skinColors || skinColors );
			const eyeDescriptor = randomItem( eyeDescriptors );
			const skinDescriptor = randomItem( skinDescriptors );
			const hairDescriptor = randomItem( hairDescriptors );
			return `Their skin is ${ skinColor } and ${ skinDescriptor }, their eyes are ${ eyeColor } and ${ eyeDescriptor }, and they have ${ hairColor } hair that is ${ hairDescriptor }.`;
		},
		lifestyle: () => {
			// maybe.. relationships etc
		},
		clothing: () => randomItem( clothing ),
		distinguishingMark: () => randomItem( distinguishingMarks ),
		abilities: () => rollAbilities(),
		voice: () => randomItemWithAlignment( voiceDescriptors, alignment ),
		plotHook: () => randomItemWithAlignment( plotHooks, alignment ),
		personality: () =>
			randomItemWithAlignment( personalityTraits, alignment ),
		ideal: () => randomItemWithAlignment( ideals, alignment ),
		bond: () => randomItemWithAlignment( bonds, alignment ),
		flaw: () => randomItemWithAlignment( flaws, alignment ),
	};
};

export default generators;
