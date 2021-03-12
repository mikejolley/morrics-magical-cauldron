/**
 * Filter object containing callbacks by specified keys.
 *
 * @param {Object} callbacks Callbacks.
 * @param {Array} keys Filter keys.
 * @return {Object} Filtered callbacks.
 */
export const filterCallbacks = ( callbacks, keys ) => {
	if ( ! keys ) {
		return callbacks;
	}
	return Object.keys( callbacks )
		.filter( ( key ) => keys.includes( key ) )
		.reduce( ( obj, key ) => {
			obj[ key ] = callbacks[ key ];
			return obj;
		}, {} );
};

/**
 * Resolve promise based callbacks and return an object of the results.
 *
 * @param {Object} callbacks Callbacks.
 * @param {Object} options Options to pass to callbacks.
 * @return {Object} Resolved promises.
 */
export const resolveAllCallbacks = ( callbacks, options = {} ) => {
	return Promise.all(
		Object.entries( callbacks ).map( ( [ , callback ] ) =>
			callback( options )
		)
	).then( ( results ) =>
		Object.keys( callbacks ).reduce( ( accumulator, key, index ) => {
			accumulator[ key ] = results[ index ];
			return accumulator;
		}, {} )
	);
};
