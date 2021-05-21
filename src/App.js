/**
 * External dependencies
 */
import { Router } from '@reach/router';
import { ApolloProvider } from '@apollo/client';
import ReactTooltip from 'react-tooltip';

/**
 * Internal dependencies
 */
import './App.scss';
import SiteHeader from 'components/site-header';
import SiteFooter from 'components/site-footer';
import { useAppApolloClient } from 'hooks';
import { AuthContextProvider } from 'context';
import {
	Homepage,
	NotFound,
	NpcGenerator,
	Account,
	TavernGenerator,
} from 'pages';

function App() {
	const client = useAppApolloClient();
	return (
		<AuthContextProvider>
			<ApolloProvider client={ client }>
				<div className="app">
					<div className="site-wrapper">
						<SiteHeader />
						<div className="site-content">
							<Router primary={ false }>
								<NotFound default />
								<Homepage path="/" />
								<NpcGenerator path="/npc-generator/*" />
								<TavernGenerator path="/tavern-generator/*" />
								<Account path="/account/*" />
							</Router>
						</div>
					</div>
					<ReactTooltip
						effect="solid"
						type="info"
						backgroundColor="#da635c"
					/>
					<SiteFooter />
				</div>
			</ApolloProvider>
		</AuthContextProvider>
	);
}

export default App;
