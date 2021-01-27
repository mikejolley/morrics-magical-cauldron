/**
 * External dependencies
 */
import { gql, useMutation } from '@apollo/client';

const UPDATEUSER = gql`
	mutation UpdateUser($id: ID!, $email: String!, $password: String) {
		updateUser(input: { id: $id, email: $email, password: $password }) {
			clientMutationId
		}
	}
`;

export const useUpdateUserMutation = () => {
	const [ mutation, mutationResults ] = useMutation( UPDATEUSER );

	const updateUserMutation = ( userId, email, password ) => {
		return mutation( {
			variables: {
				id: userId,
				email,
				password,
			},
		} );
	};

	return { updateUserMutation, results: mutationResults };
};
