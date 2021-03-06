/**
 * External dependencies
 */
import { gql, useQuery } from '@apollo/client';

const GET_CHARACTER_DATUM_BY_TYPE = gql`
	query CharacterData(
		$moral: [MoralField]
		$ethic: [EthicField]
		$type: [CharacterDataTypeField]
		$race: [RaceField]
		$gender: [GenderField]
		$limit: Int
	) {
		characterData(
			where: {
				characterDataTypeName: $type
				ethicName: $ethic
				moralName: $moral
				raceName: $race
				genderName: $gender
				orderby: { field: RAND, order: ASC }
			}
			first: $limit
		) {
			nodes {
				characterDataType
				content
				author {
					node {
						name
					}
				}
			}
		}
	}
`;

export const useCharacterDataQuery = () => {
	const query = useQuery( GET_CHARACTER_DATUM_BY_TYPE, {
		skip: true,
	} );

	return ( variables ) => query.refetch( { limit: 1, ...variables } );
};
