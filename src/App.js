/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/**
 * External dependencies
 */
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

/**
 * Internal dependencies
 */
import './App.scss';
import NpcGenerator from './components/npc-generator';

const client = new ApolloClient( {
	uri: '/api/player-data',
	cache: new InMemoryCache(),
} );

/**
 * TODO:
 * Submissions
 * Split NPC component out
 * Database integration
 * More data
 * Move CSS to components
 * BALD!
 * Move data under each component, e.g. npc/data npc/generator
 * https://docs.netlify.com/visitor-access/identity/
 * https://community.netlify.com/t/support-guide-understanding-and-using-netlifys-api/160
 * https://open-api.netlify.com/#operation/listMembersForAccount
 * https://fill-fauna.now.sh/
 */

// APP will become NPC component.
function App() {
	return (
		<ApolloProvider client={ client }>
			<div className="app">
				<header className="site-header">Dungeons &amp; Randoms</header>
				<div className="site-content">
					<NpcGenerator />
				</div>
			</div>
		</ApolloProvider>
	);
}

export default App;
