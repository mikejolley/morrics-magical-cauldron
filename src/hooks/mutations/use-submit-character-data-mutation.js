/**
 * External dependencies
 */
import { gql, useMutation } from '@apollo/client';

const MUTATION = gql`
	mutation Result(
		$content: String!
		$moral: [MoralField]!
		$ethic: [EthicField]!
		$race: [RaceField]!
		$gender: [GenderField]!
		$characterDataType: [CharacterDataTypeField]!
	) {
		submitTheCharacterData(
			input: {
				content: $content
				ethic: $ethic
				moral: $moral
				race: $race
				gender: $gender
				characterDataType: $characterDataType
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

export const useSubmitCharacterDataMutation = () => {
	const [ mutation, mutationResults ] = useMutation( MUTATION );

	return { mutation, results: mutationResults };
};
