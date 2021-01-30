/**
 * External dependencies
 */
import { Router } from '@reach/router';
import { ApolloProvider } from '@apollo/client';

/**
 * Internal dependencies
 */
import './App.scss';
import NpcGenerator from '@components/npc-generator';
import Account from '@components/account';
import {
	SiteHeader,
	SiteFooter,
	SiteNotFound,
	Homepage,
} from '@components/site';
import { useAppApolloClient } from '@hooks';
import { AuthContextProvider } from '@context';

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
								<SiteNotFound default />
								<Homepage path="/" />
								<NpcGenerator path="/npc-generator/*" />
								<Account path="/account/*" />
							</Router>
						</div>
					</div>
					<SiteFooter />
				</div>
			</ApolloProvider>
		</AuthContextProvider>
	);
}

export default App;
