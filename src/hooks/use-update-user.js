/**
 * External dependencies
 */
import { useState } from 'react';
import { decodeEntities } from '@wordpress/html-entities';
import { stripHtml } from 'string-strip-html';

/**
 * Internal dependencies
 */
import { useUpdateUserMutation } from './mutations/use-update-user-mutation';

const errorCodes = {
	invalid_username:
		'Invalid username or email address. Please check it and try again.',
	invalid_email: 'Invalid email address. Please check it and try again.',
	incorrect_password:
		'Incorrect password. Please try again, or reset your password.',
	empty_username: 'Please provide your username.',
	empty_password: 'Please provide your password.',
};

export const useUpdateUser = ( userId ) => {
	const [ error, setError ] = useState( null );
	const [ status, setStatus ] = useState( 'idle' );
	const { updateUserMutation } = useUpdateUserMutation();

	const updateUser = ( email, password ) => {
		setError( null );
		setStatus( 'resolving' );
		return updateUserMutation( userId, email, password )
			.then( () => {
				setStatus( 'resolved' );
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
		updateUser,
		error,
		status,
	};
};
