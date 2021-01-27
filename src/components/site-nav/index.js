/**
 * External dependencies
 */
import { Link } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faUserCircle,
	faPlusCircle,
	faSignInAlt,
	faPortrait,
} from '@fortawesome/free-solid-svg-icons';

/**
 * Internal dependencies
 */
import { useAuth } from '@hooks';

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

export const SiteNav = () => {
	const { isLoggedIn } = useAuth();

	return (
		<nav>
			<ul>
				<li>
					<NavLink to="/" aria-label="NPC Generator">
						<FontAwesomeIcon
							icon={ faPortrait }
							aria-hidden={ true }
						/>
						<span>NPCs</span>
					</NavLink>
				</li>
				{ isLoggedIn && (
					<li>
						<NavLink to="submit" aria-label="Submit Content">
							<FontAwesomeIcon
								icon={ faPlusCircle }
								aria-hidden={ true }
							/>
							<span>Submit</span>
						</NavLink>
					</li>
				) }

				<li>
					<NavLink to="account" aria-label="Account">
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
