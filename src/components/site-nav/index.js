/**
 * External dependencies
 */
import { Link } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faUserCircle,
	faSignInAlt,
	faPortrait,
} from '@fortawesome/free-solid-svg-icons';

/**
 * Internal dependencies
 */
import { useAuth } from 'hooks';

const NavLink = ( props ) => (
	<Link
		{ ...props }
		getProps={ ( { isCurrent, isPartiallyCurrent } ) => {
			return {
				className:
					isCurrent || isPartiallyCurrent
						? 'page page--current'
						: 'page',
			};
		} }
	/>
);

export const SiteNav = () => {
	const { isLoggedIn } = useAuth();

	return (
		<nav>
			<ul>
				<li>
					<NavLink to="/npc-generator" aria-label="NPC Generator">
						<FontAwesomeIcon
							icon={ faPortrait }
							aria-hidden={ true }
						/>
						<span>NPCs</span>
					</NavLink>
				</li>
				<li>
					<NavLink to="/account" aria-label="Account">
						<FontAwesomeIcon
							icon={ isLoggedIn ? faUserCircle : faSignInAlt }
							aria-hidden={ true }
						/>
						<span>{ isLoggedIn ? 'Account' : 'Sign in' }</span>
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default SiteNav;
