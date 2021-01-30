/**
 * External dependencies
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faWordpressSimple } from '@fortawesome/free-brands-svg-icons';

export const SiteFooter = () => {
	return (
		<footer className="site-footer">
			<ul>
				<li>
					Proudly powered by{ ' ' }
					<FontAwesomeIcon icon={ faReact } aria-label={ 'React' } />{ ' ' }
					and{ ' ' }
					<FontAwesomeIcon
						icon={ faWordpressSimple }
						aria-label={ 'WordPress' }
					/>
				</li>
				<li>
					Built by <a href="https://mikejolley.com">Mike Jolley</a>
				</li>
			</ul>
		</footer>
	);
};

export default SiteFooter;
