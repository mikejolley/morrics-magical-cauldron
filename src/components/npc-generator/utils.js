/**
 * External dependencies
 */
import randomItem from 'random-item';
import Roll from 'roll';

/**
 * Internal dependencies
 */
import { races, alignments, occupations, genders } from '@shared/data';

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
 * Used to validate data in state/localStorage.
 *
 * @param {Object} characters Contains character data.
 * @return {Object} Validated characters.
 */
export const validateCharacters = ( characters ) => {
	return Object.fromEntries(
		Object.entries( characters )
			.map( ( [ id, character ] ) => {
				if (
					! character?.data ||
					! character?.status === 'resolving'
				) {
					return false;
				}
				return [ id, character ];
			} )
			.filter( Boolean )
	);
};

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

/**
 * Parse Names template syntax.
 *
 * handles multiple "kinds" of template syntax
 *
 * a string containing '{alpha/beta}' will choose one at random
 *
 * a string starting with a $ symbol is a reference for any passed content
 * so '{$colour}' becomes 'blue' if `content` was passed as { colour: 'blue' }
 *
 * a string container using the linked format (symbol, double colon) e.g {X::aplha/beta}
 * will ensure that any other placeholder in the string that uses the same linked symbol
 * returns the same index of random that the first placeholder with that symbol did
 *
 * Based on thomascgray/fantasy-content-generator.
 *
 * @param {string} string Template string.
 * @param {Object} content Object containing content to insert.
 */
export const parseNameTemplate = ( string, content = {} ) => {
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
 * @param {Array} playerNames Array of player names and templates.
 * @param {string} race Race to generate a name for.
 * @param {string} gender Gender to generate a name for.
 * @return {string} A generated name.
 */
export const generateName = ( playerNames, race, gender ) => {
	const raceTemplates = playerNames[ race ].templates;

	if ( ! raceTemplates ) {
		return '';
	}

	const template = randomItem( raceTemplates );

	switch ( race ) {
		case 'dragonborn':
		case 'elf':
		case 'gnome':
		case 'halfling':
		case 'human':
			return parseNameTemplate( template, {
				first: randomItem( playerNames[ race ][ gender ] ),
				last: randomItem( playerNames[ race ].last ),
			} );
		case 'orc':
			return parseNameTemplate( template, {
				first: randomItem( playerNames[ race ][ gender ] ),
				last: randomItem( playerNames[ race ].last ),
				middle: randomItem( playerNames[ race ].middle ),
			} );
		case 'dwarf':
			return parseNameTemplate( template, {
				first: randomItem( playerNames[ race ][ gender ] ),
				lastPrefix: randomItem( playerNames[ race ].lastPrefix ),
				lastSuffix: randomItem( playerNames[ race ].lastSuffix ),
			} );
		case 'halfOrc':
			return parseNameTemplate( template, {
				humanFirst: randomItem( playerNames.human[ gender ] ),
				humanLast: randomItem( playerNames.human.last ),
				orcFirst: randomItem( playerNames.orc[ gender ] ),
			} );
		case 'halfElf':
			return parseNameTemplate( template, {
				humanFirst: randomItem( playerNames.human[ gender ] ),
				humanLast: randomItem( playerNames.human.last ),
				elfFirst: randomItem( playerNames.elf[ gender ] ),
				elfLast: randomItem( playerNames.elf.last ),
			} );
		case 'tiefling':
			return parseNameTemplate( template, {
				humanFirst: randomItem( playerNames.human[ gender ] ),
				humanLast: randomItem( playerNames.human.last ),
				tieflingFirst: randomItem( playerNames.tiefling[ gender ] ),
			} );
	}
};

export const rollAbilities = () => {
	return {
		str: roll.roll( '4d6b3' ).result,
		dex: roll.roll( '4d6b3' ).result,
		con: roll.roll( '4d6b3' ).result,
		int: roll.roll( '4d6b3' ).result,
		wis: roll.roll( '4d6b3' ).result,
		cha: roll.roll( '4d6b3' ).result,
	};
};
