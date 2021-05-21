export default ( state, { type, data, status, id } ) => {
	switch ( type ) {
		case 'SET_STATUS':
			state = {
				...state,
				[ id ]: {
					...( state[ id ] || {} ),
					status,
				},
			};
			break;
		case 'DELETE':
			const newState = { ...state };
			delete newState[ id ];
			state = {
				...newState,
			};
			break;
		case 'SET_STATUS_WITH_DATA':
			state = {
				...state,
				[ id ]: {
					status,
					data,
				},
			};
			break;
		case 'RESOLVE_WITH_DATA':
			state = {
				...state,
				[ id ]: {
					status: 'resolved',
					data: {
						...( state[ id ]?.data || {} ),
						...data,
					},
				},
			};
			break;
	}
	return state;
};
