/**
 * External dependencies
 */
import { Link } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHatWizard } from '@fortawesome/free-solid-svg-icons';
import { faDAndD } from '@fortawesome/free-brands-svg-icons';

const Homepage = () => {
	return (
		<>
			<div className="section feature">
				<p>
					<mark>Morric&#x27;s Magical Cauldron</mark> is a collection
					of
					<mark>random content generators</mark> intended to be used
					in casual games of <mark>Dungeons of Dragons</mark>.
				</p>
				<FontAwesomeIcon icon={ faDAndD } />
				<p>
					As well as generating random content from pre-defined tables
					(for example, Character Names by Race), it also randomises
					<mark>user submitted content</mark>, including Plot Hooks,
					Distinguishing Features, and other personality traits. To
					submit content,{ ' ' }
					<Link to="/account" className="link-button">
						sign in or create an account here.
					</Link>
				</p>
				<FontAwesomeIcon icon={ faHatWizard } />
				<p>
					This project was built by{ ' ' }
					<a href="https://mikejolley.com">Mike Jolley</a>, a.k.a.{ ' ' }
					<em>Morric Copperhammer</em>, and is hosted on GitHub.
				</p>
			</div>
		</>
	);
};

export default Homepage;
