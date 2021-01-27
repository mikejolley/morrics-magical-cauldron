/**
 * External dependencies
 */
import { useState, useRef, useEffect } from 'react';
import { decodeEntities } from '@wordpress/html-entities';
import { stripHtml } from 'string-strip-html';

/**
 * Internal dependencies
 */
import { useLogoutMutation } from './mutations/use-logout-mutation';
import { useLoginMutation } from './mutations/use-login-mutation';
import { useViewerQuery } from './queries/use-viewer-query';
import { useAuthContext } from '@context';

const errorCodes = {
	invalid_username:
		'Invalid username or email address. Please check it and try again.',
	invalid_email: 'Invalid email address. Please check it and try again.',
	incorrect_password:
		'Incorrect password. Please try again, or reset your password.',
	empty_username: 'Please provide your username.',
	empty_password: 'Please provide your password.',
};

/**
 * Hook which tracks if the user is logged in.
 */
export const useAuth = () => {
	const isSubscribed = useRef( true );
	const { isLoggedIn, setIsLoggedIn } = useAuthContext();
	const [ error, setError ] = useState( null );
	const [ status, setStatus ] = useState( 'idle' );
	const { logoutMutation } = useLogoutMutation();
	const { loginMutation } = useLoginMutation();
	const {
		data: viewer,
		refetch: refetchViewer,
		loading: loadingViewer,
	} = useViewerQuery();

	useEffect( () => {
		isSubscribed.current = true;
		return () => ( isSubscribed.current = false );
	}, [] );

	const login = ( username, password ) => {
		setError( null );
		setStatus( 'resolving' );
		return loginMutation( username, password )
			.then( () => {
				if ( isSubscribed.current ) {
					setIsLoggedIn( true );
					setStatus( 'resolved' );
				}
			} )
			.catch( ( errors ) => {
				if ( isSubscribed.current ) {
					setError(
						errorCodes[ errors.message ] ||
							`${
								stripHtml( decodeEntities( errors.message ) )
									.result
							}`
					);
					setStatus( 'resolved' );
				}
			} );
	};

	const logout = () => {
		setStatus( 'resolving' );
		return logoutMutation()
			.then( () => {
				if ( isSubscribed.current ) {
					setIsLoggedIn( false );
					setStatus( 'resolved' );
				}
			} )
			.catch( ( errors ) => {
				if ( isSubscribed.current ) {
					// eslint-disable-next-line no-console
					console.log( errors );
					setStatus( 'resolved' );
				}
			} );
	};

	return {
		login,
		logout,
		isLoggedIn,
		refetchViewer,
		loadingViewer,
		viewer,
		error,
		status,
	};
};
