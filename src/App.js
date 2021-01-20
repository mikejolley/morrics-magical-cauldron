/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/**
 * External dependencies
 */
import { Link, Router } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * Internal dependencies
 */
import './App.scss';
import NpcGenerator from '@components/npc-generator';
import Submit from '@components/submit';
/**
 * TODO:
 * Submissions
 * Database integration
 * More data
 * BALD!
 * https://docs.netlify.com/visitor-access/identity/
 * https://community.netlify.com/t/support-guide-understanding-and-using-netlifys-api/160
 * https://open-api.netlify.com/#operation/listMembersForAccount
 * https://fill-fauna.now.sh/
 */

const NotFound = () => <p>Sorry, nothing here</p>;

const NavLink = ( props ) => (
	<Link
		{ ...props }
		getProps={ ( { isCurrent } ) => {
			return {
				className: isCurrent ? 'page page--current' : 'page',
			};
		} }
	/>
);

function App() {
	return (
		<div className="app">
			<header className="site-header">
				<h1>
					<span>Dungeons</span>
					<em>
						<span> &amp; </span>
					</em>
					<span>Randoms</span>
				</h1>
				<nav>
					<ul>
						<li>
							<NavLink to="/" aria-label="NPC Generator">
								<FontAwesomeIcon
									icon={ faUserCircle }
									aria-hidden={ true }
								/>
								<span>NPCs</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="submit" aria-label="Submit Content">
								<FontAwesomeIcon
									icon={ faPlusCircle }
									aria-hidden={ true }
								/>
								<span>Submit</span>
							</NavLink>
						</li>
					</ul>
				</nav>
			</header>
			<div className="site-content">
				<Router>
					<NotFound default />
					<NpcGenerator path="/" />
					<Submit path="/submit" />
				</Router>
			</div>
		</div>
	);
}

export default App;
