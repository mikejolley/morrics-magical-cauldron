/**
 * External dependenices
 */
import Roll from 'roll';

/**
 * Allows string based die rolls e.g. 2d6.
 */
export const roll = new Roll();

// roll 4 6-sided die and record the cumulative
// total of the highest 3 dice 6 times
export const rollAbilityScore = () => {
	const rolls = [
		rollDice( 6 ),
		rollDice( 6 ),
		rollDice( 6 ),
		rollDice( 6 ),
	];
	// Sort ascending.
	rolls.sort( ( a, b ) => a - b );
	// Remove lowest value.
	rolls.shift();
	// Return the sum.
	return rolls.reduce( ( a, c ) => a + c, 0 );
};

export const rollDice = ( sides ) => {
	const min = 1;
	const max = sides;
	return min + Math.floor( Math.random() * ( max - min + 1 ) );
};

export const rollAbilities = () => {
	return {
		dex: rollAbilityScore(),
		con: rollAbilityScore(),
		int: rollAbilityScore(),
		wis: rollAbilityScore(),
		cha: rollAbilityScore(),
	};
};

export const capitalizeFirstLetter = ( string ) =>
	string.charAt( 0 ).toUpperCase() + string.slice( 1 );

export const getAbiltyScore = ( name, abilities, age ) => {
	const actual = abilities[ name ];
	const adjustments = {
		int: {
			'a middle aged': 1,
			'an old': 2,
			'a venerable': 3,
		},
		wis: {
			'a middle aged': 1,
			'an old': 2,
			'a venerable': 3,
		},
		cha: {
			'a middle aged': 1,
			'an old': 2,
			'a venerable': 3,
		},
		dex: {
			'a middle aged': -1,
			'an old': -3,
			'a venerable': -6,
		},
		str: {
			'a middle aged': -1,
			'an old': -3,
			'a venerable': -6,
		},
		con: {
			'a middle aged': -1,
			'an old': -3,
			'a venerable': -6,
		},
	};
	if ( adjustments[ name ][ age ] !== undefined ) {
		return Math.max( 1, actual + adjustments[ name ][ age ] );
	}
	return actual;
};
