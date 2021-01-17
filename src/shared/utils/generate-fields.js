export const generateFields = ( callbacks, fields = null ) => {
	const newData = {};

	if ( ! fields ) {
		Object.entries( callbacks ).forEach( ( [ key, value ] ) => {
			newData[ key ] = value();
		} );
	} else if ( Array.isArray( fields ) ) {
		fields.map( ( field ) => {
			newData[ field ] = callbacks[ field ]();
			return field;
		} );
	} else {
		newData[ fields ] = callbacks[ fields ]();
	}

	return newData;
};
