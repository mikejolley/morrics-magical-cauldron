/**
 * External dependencies
 */
import { useState } from 'react';

/**
 * Internal dependencies
 */
import { useSendPasswordResetEmailMutation } from './mutations/use-send-password-reset-email-mutation';
import { useResetUserPasswordMutation } from './mutations/use-reset-user-password-mutation';

const errorCodes = {};

/**
 * Hook which tracks if the user is logged in (assumed until a failed response).
 */
export const useResetPassword = () => {
	const [ error, setError ] = useState( null );
	const [ status, setStatus ] = useState( 'idle' );
	const {
		sendPasswordResetEmail: emailMutation,
	} = useSendPasswordResetEmailMutation();
	const { resetUserPassword: resetMutation } = useResetUserPasswordMutation();

	const sendResetPasswordEmail = ( username ) => {
		setError( null );
		setStatus( 'resolving' );
		return emailMutation( username )
			.then( () => {
				setStatus( 'resolved' );
			} )
			.catch( ( errors ) => {
				const message = errorCodes[ errors.message ]
					? errorCodes[ errors.message ]
					: `Error: ${ errors.message }`;
				setError( message );
				setStatus( 'resolved' );
			} );
	};

	const resetUserPassword = ( key, username, password ) => {
		return resetMutation( key, username, password )
			.then( () => {
				setStatus( 'resolved' );
			} )
			.catch( ( errors ) => {
				const message = errorCodes[ errors.message ]
					? errorCodes[ errors.message ]
					: `Error: ${ errors.message }`;
				setError( message );
				setStatus( 'resolved' );
			} );
	};

	return {
		resetUserPassword,
		sendResetPasswordEmail,
		error,
		status,
	};
};
