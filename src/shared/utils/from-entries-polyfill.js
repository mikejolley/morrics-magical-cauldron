/**
 * A polyfill for Object.fromEntries function.
 *
 * @param {Array} array Array to be turned back to object
 * @return {Object} the newly created object
 */
export const fromEntriesPolyfill = ( array ) =>
	array.reduce( ( obj, [ key, val ] ) => {
		obj[ key ] = val;
		return obj;
	}, {} );
