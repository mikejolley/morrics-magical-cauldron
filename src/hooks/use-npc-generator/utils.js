/**
 * External dependencies
 */
import randomItem from 'random-item';
import Roll from 'roll';

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
	const initial = roll.roll( 'd2' ).result;
	const index = roll.roll( initial === 1 ? 'd3' : 'd2' ).result;
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
 * Allows string based die rolls e.g. 2d6.
 */
export const roll = new Roll();

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

/**
 * generate a random number between 2 inclusive values
 *
 * @param {number} min minimum number to return (inclusive)
 * @param {number} max maximum number to return (inclusive)
 * @return {number} Random number.
 */
export const rand = ( min, max ) => {
	min = parseInt( min );
	max = parseInt( max );
	return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
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
		str: Math.max( roll.roll( '4d6b3' ).result + strMod, 1 ),
		dex: Math.max( roll.roll( '4d6b3' ).result + dexMod, 1 ),
		con: Math.max( roll.roll( '4d6b3' ).result + conMod, 1 ),
		int: Math.max( roll.roll( '4d6b3' ).result + intMod, 1 ),
		wis: Math.max( roll.roll( '4d6b3' ).result + wisMod, 1 ),
		cha: Math.max( roll.roll( '4d6b3' ).result + chaMod, 1 ),
	};
};

/**
 * Parse template syntax.
 *
 * handles multiple "kinds" of template syntax
 *
 * a string containing '{alpha/beta}' will choose one at random
 *
 * a string starting with a $ symbol is a reference for any passed content
 * so '{$colour}' becomes 'blue' if `content` was passed as { colour: 'blue' }
 *
 * a string container using the linked format (symbol, double colon) e.g {X::alpha/beta}
 * will ensure that any other placeholder in the string that uses the same linked symbol
 * returns the same index of random that the first placeholder with that symbol did
 *
 * Based on thomascgray/fantasy-content-generator.
 *
 * @param {string} string Template string.
 * @param {Object} content Object containing content to insert.
 */
export const parseContentTemplate = ( string, content = {} ) => {
	const regex = /{(.+?)}/gm;

	const matches = string.match( regex );

	const linkedPlaceholderIndexes = {};

	if ( matches ) {
		// is our match a placeholder setup
		matches.forEach( ( match ) => {
			const linkedPlaceholderMatches = /{(.+?)::(.+?)}/gm.exec( match );
			if ( linkedPlaceholderMatches ) {
				const rawLinkToken = linkedPlaceholderMatches[ 1 ];
				if ( linkedPlaceholderIndexes[ rawLinkToken ] !== null ) {
					// if we're already setup
					const replacement = linkedPlaceholderMatches[ 2 ].split(
						'/'
					)[ linkedPlaceholderIndexes[ rawLinkToken ] ];
					string = string.replace( match, replacement );
				} else {
					// if not, we need to do the first one and add the index into the linkedPlaceholderIndexes
					const allPlaceholderChunks = linkedPlaceholderMatches[ 2 ].split(
						'/'
					);
					const newIndex = rand( 0, allPlaceholderChunks.length - 1 );
					const replacement = allPlaceholderChunks[ newIndex ];
					linkedPlaceholderIndexes[ rawLinkToken ] = newIndex; // set it up for further matches
					string = string.replace( match, replacement );
				}
			}
		} );

		matches.forEach( ( match ) => {
			if ( match.charAt( 1 ) === '$' ) {
				const replacementVarName = match.substring(
					2,
					match.length - 1
				);
				string = string.replace( match, content[ replacementVarName ] );
			} else {
				const replacement = randomItem(
					match
						.substring( 1 )
						.substring( 0, match.length - 2 )
						.split( '/' )
				);
				string = string.replace( match, replacement );
			}
		} );
	}

	return string;
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
	const heightInFeet = base + roll.roll( modifier ).result / 12;
	const feet = Math.floor( heightInFeet );
	const inches = Math.round( ( heightInFeet - feet ) * 12 );
	return feet + "'" + inches + '"';
};

export const generateAppearance = ( { gender, age, raceData } ) => {
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
	const eyeColor = randomItem( raceData.eyeColors || eyeColors );
	const skinDescriptor = randomItem( skinDescriptors );
	const skinColor = randomItem( raceData.skinColors || skinColors );

	return `They have ${ skinDescriptor }, ${ skinColor } skin, ${ eyeDescriptor }, ${ eyeColor } eyes, and ${ hairDescription }.`;
};
