/**
 * External dependencies
 */
import { gql, useQuery } from '@apollo/client';

const GET_TAVERN_DATUM_BY_TYPE = gql`
	query TavernData(
		$socialClass: [SocialClassField]
		$type: [TavernDataTypeField]
		$limit: Int
	) {
		tavernData(
			where: {
				tavernDataTypeName: $type
				socialClassName: $socialClass
				orderby: { field: RAND, order: ASC }
			}
			first: $limit
		) {
			nodes {
				tavernDataType
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

export const useTavernDataQuery = () => {
	const query = useQuery( GET_TAVERN_DATUM_BY_TYPE, {
		skip: true,
	} );

	return ( variables ) => query.refetch( { limit: 1, ...variables } );
};
