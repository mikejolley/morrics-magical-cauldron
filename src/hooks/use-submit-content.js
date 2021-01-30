/**
 * External dependencies
 */
import { useState } from 'react';
import { decodeEntities } from '@wordpress/html-entities';
import { stripHtml } from 'string-strip-html';

/**
 * Internal dependencies
 */
import { useSubmitContentMutation } from './mutations/use-submit-content-mutation';

const errorCodes = {};

/**
 * Hook which submits content via the API.
 */
export const useSubmitContent = () => {
	const [ error, setError ] = useState( null );
	const [ status, setStatus ] = useState( 'idle' );
	const { submitContentMutation } = useSubmitContentMutation();

	const submitContent = ( { content, moral, ethic, type, race, gender } ) => {
		setError( null );
		setStatus( 'resolving' );
		return submitContentMutation( {
			content,
			moral,
			ethic,
			type,
			race,
			gender,
		} )
			.then( ( result ) => {
				setStatus( 'resolved' );
				return result.data;
			} )
			.catch( ( errors ) => {
				setError(
					errorCodes[ errors.message ] ||
						`${
							stripHtml( decodeEntities( errors.message ) ).result
						}`
				);
				setStatus( 'resolved' );
			} );
	};

	return {
		submitContent,
		error,
		setError,
		status,
	};
};
