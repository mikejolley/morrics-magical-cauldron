/**
 * External dependencies
 */
import { gql, useMutation } from '@apollo/client';

const LOGIN = gql`
	mutation Login($login: String!, $password: String!) {
		loginWithCookies(input: { login: $login, password: $password }) {
			status
		}
	}
`;

export const useLoginMutation = () => {
	const [ mutation, mutationResults ] = useMutation( LOGIN );

	const loginMutation = ( username, password ) => {
		return mutation( {
			variables: {
				login: username,
				password,
			},
		} );
	};

	return { loginMutation, results: mutationResults };
};
