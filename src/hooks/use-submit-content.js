/**
 * External dependencies
 */
import { useState } from 'react';
import { decodeEntities } from '@wordpress/html-entities';
import { stripHtml } from 'string-strip-html';

/**
 * Internal dependencies
 */
import {
	useSubmitCharacterDataMutation,
	useSubmitTavernDataMutation,
} from './mutations';

/**
 * Hook which submits content via the API.
 *
 * @param {string} contentType Type of content (post type) e.g. character, tavern
 */
export const useSubmitContent = ( contentType ) => {
	const [ status, setStatus ] = useState( 'idle' );
	const { mutation: submitCharacterData } = useSubmitCharacterDataMutation();
	const { mutation: submitTavernData } = useSubmitTavernDataMutation();

	const submitContent = ( props ) => {
		setStatus( 'resolving' );

		const success = ( result ) => {
			setStatus( 'resolved' );
			return result.data;
		};

		const fail = ( errors ) => {
			setStatus( 'resolved' );
			throw new Error(
				`${ stripHtml( decodeEntities( errors.message ) ).result }`
			);
		};

		const {
			ethic,
			moral,
			race,
			gender,
			type,
			content,
			socialClass,
		} = props;

		switch ( contentType ) {
			case 'character':
				return submitCharacterData( {
					variables: {
						content,
						ethic: ethic ? ethic : 'any',
						moral: moral ? moral : 'any',
						race: race ? race : 'any',
						gender: gender ? gender : 'any',
						characterDataType: type,
					},
				} )
					.then( success )
					.catch( fail );
			case 'tavern':
				return submitTavernData( {
					variables: {
						content,
						socialClass: socialClass ? socialClass : 'any',
						tavernDataType: type,
					},
				} )
					.then( success )
					.catch( fail );
		}

		return Promise.reject();
	};

	return {
		submitContent,
		status,
	};
};
