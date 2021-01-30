/**
 * External dependencies
 */
import { Link, Router } from '@reach/router';

/**
 * Internal dependencies
 */
import Generator from './generator';
import SubmitForm from './submit-form';
import './style.scss';

const NpcGenerator = () => {
	return (
		<div className="npc-generator">
			<hgroup>
				<h2>NPC Generator</h2>
			</hgroup>
			<nav className="tab-nav">
				<Link to="">Generate</Link>
				<Link to="submit">Submit Content</Link>
			</nav>
			<Router primary={ false }>
				<Generator path="/" />
				<SubmitForm path="/submit" />
			</Router>
		</div>
	);
};

export default NpcGenerator;
