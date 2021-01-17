import { gql } from '@apollo/client';

export const GET_PLAYER_DATA = gql`
	query allPlayerData {
		allPlayerData {
			data {
				type
				description
				moral
				ethic
				author
			}
		}
	}
`;
