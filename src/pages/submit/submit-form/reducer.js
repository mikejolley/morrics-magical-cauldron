/**
 * External dependencies
 */
import { v4 as uuidv4 } from 'uuid';

export default ( state, { type, content, error, id } ) => {
	const newId = uuidv4();

	switch ( type ) {
		case 'SET_PRISTINE':
			state = {
				[ newId ]: {
					content: '',
					error: '',
				},
			};
			break;
		case 'SET_ERROR':
			state = {
				...state,
				[ id ]: {
					...( state[ id ] || {} ),
					error,
				},
			};
			break;
		case 'INSERT':
			state = {
				...state,
				[ newId ]: {
					content: '',
					error: '',
				},
			};
			break;
		case 'REMOVE':
			const newState = { ...state };
			delete newState[ id ];
			state = {
				...newState,
			};
			break;
		case 'UPDATE':
			state = {
				...state,
				[ id ]: {
					content,
					error: '',
				},
			};
			break;
	}
	return state;
};
