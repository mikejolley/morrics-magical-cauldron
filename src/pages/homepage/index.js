/**
 * External dependencies
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDAndD } from '@fortawesome/free-brands-svg-icons';

const Homepage = () => {
	return (
		<>
			<div className="section feature">
				<p>
					<mark>Morric&#x27;s Magical Cauldron</mark> is a collection
					of
					<mark>random content generators</mark> for casual games of{ ' ' }
					<mark>Dungeons of Dragons</mark>. It uses a mixture of
					pre-defined and <mark>user submitted content</mark>,
					including Plot Hooks, Distinguishing Features, and other
					traits.
				</p>
				<FontAwesomeIcon icon={ faDAndD } />
				<p>
					This project was built by{ ' ' }
					<a href="https://mikejolley.com">Mike Jolley</a>, a.k.a.{ ' ' }
					<em>Morric Copperhammer</em>.
					<a href="https://github.com/mikejolley/morrics-magical-cauldron">
						You may contribute on GitHub.
					</a>
				</p>
			</div>
			<div className="section">
				<h2>What&#x27;s New</h2>
				<ul className="changelog">
					<li>
						<strong>12th March 2021</strong>
						<ul>
							<li>News - Started this changelog!</li>
							<li>
								Refactor - General refactoring for performance
								and tidiness.
							</li>
							<li>Fix - Autocomplete on form fields.</li>
						</ul>
					</li>
				</ul>
			</div>
		</>
	);
};

export default Homepage;
