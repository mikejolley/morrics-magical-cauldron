/**
 * External dependencies
 */
import { gql, useMutation } from '@apollo/client';

const SUBMIT = gql`
	mutation SubmitCharacterData(
		$content: String!
		$moral: [MoralField]!
		$ethic: [EthicField]!
		$race: [RaceField]!
		$gender: [GenderField]!
		$type: CharacterDataTypeField!
	) {
		submitCharacterData(
			input: {
				content: $content
				ethic: $ethic
				moral: $moral
				race: $race
				gender: $gender
				type: $type
			}
		) {
			characterDatum {
				guid
				status
			}
			status
		}
	}
`;

export const useSubmitContentMutation = () => {
	const [ mutation, mutationResults ] = useMutation( SUBMIT );

	const submitContentMutation = ( {
		content,
		moral,
		ethic,
		type,
		race,
		gender,
	} ) => {
		return mutation( {
			variables: {
				content,
				moral,
				ethic,
				type,
				race,
				gender,
			},
		} );
	};

	return { submitContentMutation, results: mutationResults };
};
