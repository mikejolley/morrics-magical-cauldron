/**
 * generate a random number between 2 inclusive values
 *
 * @param {number} min minimum number to return (inclusive)
 * @param {number} max maximum number to return (inclusive)
 * @return {number} Random number.
 */
export const rand = ( min, max ) => {
	return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
};
