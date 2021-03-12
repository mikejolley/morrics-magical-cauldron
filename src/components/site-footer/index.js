/**
 * External dependencies
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faReact,
	faWordpressSimple,
	faFontAwesome,
} from '@fortawesome/free-brands-svg-icons';

export const SiteFooter = () => {
	return (
		<footer className="site-footer">
			<ul>
				<li>
					Proudly powered by{ ' ' }
					<a href="https://reactjs.org/" rel="nofollow">
						<FontAwesomeIcon
							icon={ faReact }
							aria-label={ 'React' }
						/>
					</a>
					<a href="https://wordpress.com/" rel="nofollow">
						<FontAwesomeIcon
							icon={ faWordpressSimple }
							aria-label={ 'WordPress' }
						/>
					</a>
					<a href="https://fontawesome.com/license" rel="nofollow">
						<FontAwesomeIcon
							icon={ faFontAwesome }
							aria-label={ 'WordPress' }
						/>
					</a>
				</li>
				<li>
					Built by <a href="https://mikejolley.com">Mike Jolley</a>
				</li>
			</ul>
		</footer>
	);
};

export default SiteFooter;
