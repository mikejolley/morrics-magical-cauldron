/**
 * External dependencies
 */
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

/**
 * Internal dependencies
 */
//import { useAuthToken } from './___use-auth-token';

const cache = new InMemoryCache( {} );
const httpLink = new createHttpLink( {
	uri: 'https://dungeonsandrandoms.local/index.php?graphql',
	credentials: 'include',
} );

/*const authMiddleware = ( authToken ) =>
	new ApolloLink( ( operation, forward ) => {
		// add the authorization to the headers
		if ( authToken ) {
			operation.setContext( {
				headers: {
					authorization: `Bearer ${ authToken }`,
				},
			} );
		}

		return forward( operation );
	} );*/

export const useAppApolloClient = () => {
	return new ApolloClient( {
		link: httpLink,
		//link: authMiddleware( authToken ).concat( httpLink ),
		cache,
	} );
};
