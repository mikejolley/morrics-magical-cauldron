import { gql } from '@apollo/client';

export const GET_PLAYER_DATA = gql`
	query allCharacterData {
		characterData {
			nodes {
				moral
				ethic
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
