/**
 * External dependencies
 */
import Roll from 'roll';

const rollClass = new Roll();

/**
 * Allows string based die rolls e.g. 2d6.
 *
 * @param {string} dice Dice to roll. Defaults to d20.
 */
export const roll = ( dice = 'd20' ) => {
	return rollClass.roll( dice ).result;
};
