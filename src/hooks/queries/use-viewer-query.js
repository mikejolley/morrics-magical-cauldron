/**
 * External dependencies
 */
import { gql, useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';

/**
 * Internal dependencies
 */
import { useAuthContext } from '@context';
import { useSafeDispatch } from '@hooks';

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
	const { setIsLoggedIn, isLoggedIn } = useAuthContext();

	useEffect( () => {
		if ( isLoggedIn ) {
			getViewer();
		}
	}, [ isLoggedIn ] );

	const onError = useSafeDispatch( () => {
		setIsLoggedIn( false );
	} );

	const onCompleted = useSafeDispatch( ( theData ) => {
		if ( ! theData?.viewer ) {
			setIsLoggedIn( false );
		}
	} );

	const [ getViewer, { loading, error, data } ] = useLazyQuery( VIEWER, {
		fetchPolicy: 'network-only',
		onError,
		onCompleted,
	} );

	return {
		loading,
		error,
		data: data && data.viewer ? data.viewer : null,
		getViewer,
	};
};
