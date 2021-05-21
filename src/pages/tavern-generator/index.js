/**
 * External dependencies
 */
import { Link, Router } from '@reach/router';

/**
 * Internal dependencies
 */
import Generator from './generator';
//import SubmitForm from './submit-form';
import './style.scss';

const TavernGenerator = () => {
	return (
		<div className="tavern-generator">
			<hgroup>
				<h2>Tavern Generator</h2>
			</hgroup>
			<nav className="tab-nav">
				<Link to="">Generate</Link>
				<Link to="submit">Submit Content</Link>
			</nav>
			<Generator path="/" />
			<Router primary={ false }>
				{ /*<Generator path="/" />
				<SubmitForm path="/submit" />*/ }
			</Router>
		</div>
	);
};

export default TavernGenerator;
