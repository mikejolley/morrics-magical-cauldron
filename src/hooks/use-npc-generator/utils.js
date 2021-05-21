/**
 * External dependencies
 */
import randomItem from 'random-item';

/**
 * Internal dependencies
 */
import {
	races,
	alignments,
	occupations,
	genders,
	playerNames,
	hairColors,
	eyeColors,
	skinColors,
	skinDescriptors,
	eyeDescriptors,
	hairDescriptors,
} from 'shared/data';
import { roll, parseContentTemplate } from 'shared/utils';

/**
 * Get a random race.
 *
 * @return {Object} Race Object.
 */
export const randomRace = () => randomItem( Object.keys( races ) );

/**
 * Get a random alignment.
 *
 * @return {string} Alignment id.
 */
export const randomAlignment = () =>
	randomItem( alignments.map( ( { id } ) => id ) );

/**
 * Get a random gender, weighted.
 *
 * @return {string} Alignment id.
 */
export const randomGender = () => {
	const ids = genders.map( ( { id } ) => id );
	const initial = roll( 'd2' );
	const index = roll( initial === 1 ? 'd3' : 'd2' );
	return ids[ index - 1 ];
};

/**
 * Get a random occupation.
 *
 * @param {string} alignment Alignment ID to limit results.
 * @return {string} Occupation name.
 */
export const randomOccupation = ( alignment ) =>
	randomItem(
		randomMultipleAlignments( occupations, alignment ).occupations
	);

/**
 * Select a random item, but choose another if the alignment conflicts.
 *
 * @param {Array} items List of items.
 * @param {Object} alignment Alignment data.
 * @return {Object|string} Random item.
 */
export const randomMultipleAlignments = ( items, alignment ) => {
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

const abilityScoreAgeModifiers = {
	child: {
		str: -3,
		dex: -3,
		con: -3,
		int: -3,
		wis: -3,
		cha: -3,
	},
	adolescent: {
		str: -1,
		dex: -1,
		con: -1,
		int: -1,
		wis: -1,
		cha: -1,
	},
	middleAge: {
		str: -1,
		dex: -1,
		con: -1,
		int: 1,
		wis: 1,
		cha: 1,
	},
	old: {
		str: -3,
		dex: -3,
		con: -3,
		int: 2,
		wis: 2,
		cha: 2,
	},
	venerable: {
		str: -6,
		dex: -6,
		con: -6,
		int: 3,
		wis: 3,
		cha: 3,
	},
};

export const rollAbilities = ( { age } ) => {
	const ageModifier =
		abilityScoreAgeModifiers[
			Object.keys( abilityScoreAgeModifiers ).find(
				( ageGroup ) => age === ageGroup
			)
		];
	const strMod = ageModifier?.str || 0;
	const dexMod = ageModifier?.dex || 0;
	const conMod = ageModifier?.con || 0;
	const intMod = ageModifier?.int || 0;
	const wisMod = ageModifier?.wis || 0;
	const chaMod = ageModifier?.cha || 0;
	return {
		str: Math.max( roll( '4d6b3' ) + strMod, 1 ),
		dex: Math.max( roll( '4d6b3' ) + dexMod, 1 ),
		con: Math.max( roll( '4d6b3' ) + conMod, 1 ),
		int: Math.max( roll( '4d6b3' ) + intMod, 1 ),
		wis: Math.max( roll( '4d6b3' ) + wisMod, 1 ),
		cha: Math.max( roll( '4d6b3' ) + chaMod, 1 ),
	};
};

/**
 * generate a name for a race and gender.
 *
 * @param {string} race Race to generate a name for.
 * @param {string} gender Gender to generate a name for.
 * @return {string} A generated name.
 */
export const generateName = ( race, gender ) => {
	const raceTemplates = playerNames[ race ].templates;

	if ( ! raceTemplates ) {
		return '';
	}

	if ( ! gender || gender === 'nonbinary' ) {
		gender = randomItem( [ 'male', 'female' ] );
	}

	const template = randomItem( raceTemplates );

	switch ( race ) {
		case 'dragonborn':
		case 'elf':
		case 'gnome':
		case 'halfling':
		case 'human':
			return parseContentTemplate( template, {
				first: randomItem( playerNames[ race ][ gender ] ),
				last: randomItem( playerNames[ race ].last ),
			} );
		case 'orc':
			return parseContentTemplate( template, {
				first: randomItem( playerNames[ race ][ gender ] ),
				last: randomItem( playerNames[ race ].last ),
				middle: randomItem( playerNames[ race ].middle ),
			} );
		case 'dwarf':
			return parseContentTemplate( template, {
				first: randomItem( playerNames[ race ][ gender ] ),
				lastPrefix: randomItem( playerNames[ race ].lastPrefix ),
				lastSuffix: randomItem( playerNames[ race ].lastSuffix ),
			} );
		case 'halfOrc':
			return parseContentTemplate( template, {
				humanFirst: randomItem( playerNames.human[ gender ] ),
				humanLast: randomItem( playerNames.human.last ),
				orcFirst: randomItem( playerNames.orc[ gender ] ),
			} );
		case 'halfElf':
			return parseContentTemplate( template, {
				humanFirst: randomItem( playerNames.human[ gender ] ),
				humanLast: randomItem( playerNames.human.last ),
				elfFirst: randomItem( playerNames.elf[ gender ] ),
				elfLast: randomItem( playerNames.elf.last ),
			} );
		case 'tiefling':
			return parseContentTemplate( template, {
				humanFirst: randomItem( playerNames.human[ gender ] ),
				humanLast: randomItem( playerNames.human.last ),
				tieflingFirst: randomItem( playerNames.tiefling[ gender ] ),
			} );
	}
};

export const generateHeight = ( { raceData } ) => {
	const base = raceData.baseHeight || 4.67;
	const modifier = raceData.heightModifier || '2d10';
	const heightInFeet = base + roll( modifier ) / 12;
	const feet = Math.floor( heightInFeet );
	const inches = Math.round( ( heightInFeet - feet ) * 12 );
	return feet + "'" + inches + '"';
};

export const generateAppearance = ( { gender, age, raceData } ) => {
	let baldRoll = roll( 'd100' );

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
	const eyeColor = randomItem( raceData.eyeColors || eyeColors );
	const skinDescriptor = randomItem( skinDescriptors );
	const skinColor = randomItem( raceData.skinColors || skinColors );

	return `They have ${ skinDescriptor }, ${ skinColor } skin, ${ eyeDescriptor }, ${ eyeColor } eyes, and ${ hairDescription }.`;
};
