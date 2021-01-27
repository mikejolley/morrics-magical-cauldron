/**
 * External dependencies
 */
import { gql, useLazyQuery } from '@apollo/client';
import { useRef, useEffect } from 'react';

/**
 * Internal dependencies
 */
import { useAuthContext } from '@context';

const VIEWER = gql`
	query viewer {
		viewer {
			id
			email
			username
		}
	}
`;

/**
 * Hook which gets details about the logged in user.
 */
export const useViewerQuery = () => {
	const isSubscribed = useRef( true );
	const { isLoggedIn, setIsLoggedIn } = useAuthContext();

	const [ getViewer, { loading, error, data } ] = useLazyQuery( VIEWER, {
		fetchPolicy: 'network-only',
		onError: () => {
			if ( isSubscribed.current ) {
				setIsLoggedIn( false );
			}
		},
		onCompleted: ( theData ) => {
			if ( isSubscribed.current && ! theData?.viewer ) {
				setIsLoggedIn( false );
			}
		},
	} );

	useEffect( () => {
		isSubscribed.current = true;
		if ( isLoggedIn ) {
			getViewer();
		}
		return () => ( isSubscribed.current = false );
	}, [ isLoggedIn ] );

	return {
		loading,
		error,
		data: data && data.viewer ? data.viewer : null,
		getViewer,
	};
};
