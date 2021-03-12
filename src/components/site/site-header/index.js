/**
 * External dependencies
 */
import { Link } from '@reach/router';

/**
 * Internal dependencies
 */
import { SiteNav } from 'components/site';

export const SiteHeader = () => {
	return (
		<div className="site-header-wrapper">
			<header className="site-header">
				<h1>
					<Link
						to="/"
						aria-label="Morric&#x27;s Magical Cauldron Home"
					>
						<span>Morric&#x27;s</span>
						<em>
							<span> magical </span>
						</em>
						<span>Cauldron</span>
					</Link>
				</h1>
				<SiteNav />
			</header>
		</div>
	);
};
export default SiteHeader;
