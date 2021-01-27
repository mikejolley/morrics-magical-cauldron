/**
 * External dependencies
 */
import { gql, useMutation } from '@apollo/client';

const SUBMIT = gql`
	mutation Login(
		$content: String!
		$moral: String!
		$ethic: String!
		$type: String!
	) {
		submitCharacterData(
			input: {
				content: $content
				ethic: $ethic
				moral: $moral
				type: $type
			}
		) {
			characterDatum {
				guid
				status
			}
		}
	}
`;

export const useSubmitMutation = () => {
	const [ mutation, mutationResults ] = useMutation( SUBMIT );

	const submit = ( content, moral, ethic, type ) => {
		return mutation( {
			variables: {
				content,
				moral,
				ethic,
				type,
			},
		} );
	};

	return { submit, results: mutationResults };
};
