/**
 * External dependencies
 */
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useReducer } from 'react';

/**
 * Internal dependencies
 */
import reducer from './reducer';

export const generateId = () => {
	return uuidv4();
};

export const resolvingData = ( dispatch, id, data ) => {
	if ( typeof data === undefined ) {
		dispatch( { type: 'SET_STATUS', id, status: 'resolving' } );
	} else {
		dispatch( {
			type: 'SET_STATUS_WITH_DATA',
			id,
			data,
			status: 'resolving',
		} );
	}
};

export const resolveData = ( dispatch, id, data ) => {
	if ( typeof data === undefined ) {
		dispatch( {
			type: 'SET_STATUS',
			id,
			status: 'resolved',
		} );
	} else {
		dispatch( { type: 'RESOLVE_WITH_DATA', id, data } );
	}
};

export const removeData = ( dispatch, id ) => {
	dispatch( { type: 'DELETE', id } );
};

/**
 * Used to validate data in state/localStorage.
 *
 * @param {Object} data Contains character data.
 * @return {Object} Validated characters.
 */
const validateDataFromLocalStorage = ( data ) => {
	return Object.fromEntries(
		Object.entries( data )
			.map( ( [ id, datum ] ) => {
				if ( ! datum?.data || ! datum?.status === 'resolving' ) {
					return false;
				}
				return [ id, datum ];
			} )
			.filter( Boolean )
	);
};

/**
 * Get data from local storage with specific key.
 *
 * @param {string} key local storage key
 */
const getDataFromLocalStorage = ( key ) => () => {
	const valueInLocalStorage = window.localStorage.getItem( key );

	return valueInLocalStorage
		? validateDataFromLocalStorage( JSON.parse( valueInLocalStorage ) )
		: {};
};

export const useGeneratorData = ( key ) => {
	const [ data, dispatch ] = useReducer(
		reducer,
		{},
		getDataFromLocalStorage( key )
	);

	useEffect( () => {
		window.localStorage.setItem( key, JSON.stringify( data ) );
	}, [ data ] );

	return {
		data,
		dispatch,
		generateId,
		resolvingData,
		resolveData,
		removeData,
	};
};
