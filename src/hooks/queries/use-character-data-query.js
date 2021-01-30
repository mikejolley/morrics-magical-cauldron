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
			first: 1
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
	const { refetch } = useQuery( GET_CHARACTER_DATUM_BY_TYPE, { skip: true } );

	return ( variables ) => refetch( variables );
};
