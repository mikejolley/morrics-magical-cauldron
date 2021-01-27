/**
 * External dependencies
 */
import { gql, useMutation } from '@apollo/client';

const QUERY = gql`
	mutation ResetUserPassword(
		$key: String!
		$login: String!
		$password: String!
	) {
		resetUserPassword(
			input: { key: $key, login: $login, password: $password }
		) {
			clientMutationId
		}
	}
`;

export const useResetUserPasswordMutation = () => {
	const [ mutation, mutationResults ] = useMutation( QUERY );

	const resetUserPassword = ( key, login, password ) => {
		return mutation( {
			variables: {
				key,
				login,
				password,
			},
		} );
	};

	return { resetUserPassword, results: mutationResults };
};
