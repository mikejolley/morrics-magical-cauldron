/**
 * External dependencies
 */
import { gql, useMutation } from '@apollo/client';

const MUTATION = gql`
	mutation Result(
		$content: String!
		$socialClass: [SocialClassField]!
		$tavernDataType: [TavernDataTypeField]!
	) {
		submitTheTavernData(
			input: {
				content: $content
				socialClass: $socialClass
				tavernDataType: $tavernDataType
			}
		) {
			tavernDatum {
				guid
				status
			}
			status
		}
	}
`;

export const useSubmitTavernDataMutation = () => {
	const [ mutation, mutationResults ] = useMutation( MUTATION );

	return { mutation, results: mutationResults };
};
