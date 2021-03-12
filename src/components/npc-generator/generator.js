/**
 * External dependencies
 */
import { useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

/**
 * Internal dependencies
 */
import CharacterCards from './character-cards';
import OptionsForm from './options-form';
import { useGenerator } from './use-generator';
import { validateCharacters } from './utils';
import reducer from './reducer';

const Generator = () => {
	const getCallbacks = useGenerator();
	const [ characters, dispatch ] = useReducer( reducer, {}, () => {
		const valueInLocalStorage = window.localStorage.getItem(
			'npc-generator'
		);

		return valueInLocalStorage
			? validateCharacters( JSON.parse( valueInLocalStorage ) )
			: {};
	} );

	useEffect( () => {
		window.localStorage.setItem(
			'npc-generator',
			JSON.stringify( characters )
		);
	}, [ characters ] );

	/**
	 * Returns a promise for querying and generating character data.
	 *
	 * @param {Object} options Options used to create character.
	 */
	const generateCharacter = ( options ) => {
		const { resolveCallbacks } = getCallbacks( options );
		const characterId = uuidv4();

		dispatch( { type: 'SET_STATUS', characterId, status: 'resolving' } );
		resolveCallbacks().then( ( data ) => {
			if ( ! data ) {
				removeCharacter( characterId );
				return;
			}
			dispatch( { type: 'RESOLVE_WITH_DATA', characterId, data } );
		} );
	};

	const removeCharacter = ( id ) =>
		dispatch( { type: 'DELETE', characterId: id } );

	/**
	 * Rerolls fields by using the current character data instead of options so race etc is preserved.
	 *
	 * @param {string} characterId Character ID.
	 * @param {Array} fieldNames Fields to reroll.
	 * @param {Object} options Additional options.
	 */
	const reroll = ( characterId, fieldNames, options = {} ) => {
		const currentData = characters[ characterId ];
		const fields = Array.isArray( fieldNames )
			? fieldNames
			: [ fieldNames ];

		const currentDataWithoutRerolled = Object.entries( currentData.data )
			.filter( ( dataItem ) => ! fields.includes( dataItem[ 0 ] ) )
			.reduce( function ( a, v ) {
				a[ v[ 0 ] ] = v[ 1 ];
				return a;
			}, {} );

		dispatch( {
			type: 'SET_STATUS_WITH_DATA',
			characterId,
			data: currentDataWithoutRerolled,
			status: 'resolving',
		} );

		const { resolveCallbacks } = getCallbacks( currentDataWithoutRerolled );

		resolveCallbacks( fields, options )
			.then( ( data ) => {
				dispatch( { type: 'RESOLVE_WITH_DATA', characterId, data } );
			} )
			.catch( () => {
				dispatch( {
					type: 'SET_STATUS',
					characterId,
					status: 'resolved',
				} );
			} );
	};

	return (
		<>
			<OptionsForm onChange={ generateCharacter } />
			<CharacterCards
				characters={ characters }
				onRemove={ removeCharacter }
				reroll={ reroll }
			/>
		</>
	);
};

export default Generator;
