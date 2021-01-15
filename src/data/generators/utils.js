/**
 * Generates all fields, and allows some values to be fixed/forced.
 *
 * @param {Object} generators Object containing generator callbacks.
 * @param {Object} fixedValues Object containing a list of values to force (do not generate randomly).
 * @return {Object} Generated data.
 */
export const generateAll = ( generators, fixedValues = {} ) => {
	const data = {};

	Object.entries( generators ).forEach( ( [ key, value ] ) => {
		data[ key ] = fixedValues[ key ] ? fixedValues[ key ] : value();
	} );

	return data;
};

/**
 * Generates a list of fields.
 *
 * @param {Object} generators Array of generator callbacks.
 * @param {Array|string} fields Array containing a list of fields to generate.
 * @return {Object} Generated data.
 */
export const generateFields = ( generators, fields = [] ) => {
	const data = {};

	if ( ! fields ) {
		return data;
	}

	if ( Array.isArray( fields ) ) {
		fields.map( ( field ) => {
			data[ field ] = generators[ field ]();
			return field;
		} );
	} else {
		data[ fields ] = generators[ fields ]();
	}

	return data;
};
