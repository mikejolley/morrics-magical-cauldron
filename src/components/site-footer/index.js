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
					<a
						href="https://mikejolley.com"
						title="Built by Mike Jolley"
					>
						<svg
							viewBox="0 0 188 90"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g fillRule="evenodd" opacity=".752">
								<path d="M52 0l51.962 90H.038z"></path>
								<path d="M92 0l51.962 90H40.038z"></path>
								<path d="M188 0v45c0 24.853-20.147 45-45 45-24.604 0-44.597-19.746-44.994-44.256L98 45h45V0h45z"></path>
							</g>
						</svg>
					</a>
				</li>
			</ul>
		</footer>
	);
};

export default SiteFooter;
