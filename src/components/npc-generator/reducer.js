export default ( state, { type, data, status, characterId } ) => {
	switch ( type ) {
		case 'SET_STATUS':
			state = {
				...state,
				[ characterId ]: {
					...( state[ characterId ] || {} ),
					status,
				},
			};
			break;
		case 'DELETE':
			const newState = { ...state };
			delete newState[ characterId ];
			state = {
				...newState,
			};
			break;
		case 'SET_STATUS_WITH_DATA':
			state = {
				...state,
				[ characterId ]: {
					status,
					data,
				},
			};
			break;
		case 'RESOLVE_WITH_DATA':
			state = {
				...state,
				[ characterId ]: {
					status: 'resolved',
					data: {
						...( state[ characterId ]?.data || {} ),
						...data,
					},
				},
			};
			break;
	}
	return state;
};
