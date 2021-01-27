/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/**
 * External dependencies
 */
import { Link, Router } from '@reach/router';
import { ApolloProvider } from '@apollo/client';

/**
 * Internal dependencies
 */
import './App.scss';
import NpcGenerator from '@components/npc-generator';
import Submit from '@components/submit';
import Account from '@components/account';
import SiteNav from '@components/site-nav';
import SiteFooter from '@components/site-footer';
import { useAppApolloClient } from '@hooks';
import { AuthContextProvider } from '@context';
import { ResetPasswordEmail, ResetPassword } from '@components/account/reset';

/**
 * TODO:
 * Submissions
 * Database integration
 * More data
 * BALD!
 */

const NotFound = () => <p>Sorry, nothing here</p>;

function App() {
	const client = useAppApolloClient();

	return (
		<AuthContextProvider>
			<ApolloProvider client={ client }>
				<div className="app">
					<div className="site-wrapper">
						<div className="header-wrapper">
							<header className="site-header">
								<h1>
									<Link
										to="/"
										aria-label="Dungeons &amp; Randoms Home"
									>
										<span>Dungeons</span>
										<em>
											<span> &amp; </span>
										</em>
										<span>Randoms</span>
									</Link>
								</h1>

								<SiteNav />
							</header>
						</div>
						<div className="site-content">
							<Router primary={ false }>
								<NotFound default />
								<NpcGenerator path="/" />
								<Submit path="submit" />
								<Account path="account" />
								<ResetPasswordEmail path="account/reset" />
								<ResetPassword path="account/reset/:resetLogin/:resetKey" />
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
