/**
 * External dependencies
 */
import { Link, Router } from '@reach/router';

/**
 * Internal dependencies
 */
import Form from './form';
import { npcContentTypes, tavernContentTypes } from './constants';
import NpcOptions from './npc-options';
import TavernOptions from './tavern-options';

const SubmitForm = () => {
	return (
		<>
			<nav className="tab-nav">
				<Link to="">NPC</Link>
				<Link to="tavern">Tavern</Link>
			</nav>
			<Router primary={ false }>
				<Form
					path="/"
					contentType="character"
					subContentTypes={ npcContentTypes }
					OptionsComponent={ NpcOptions }
				/>
				<Form
					path="/tavern"
					contentType="tavern"
					subContentTypes={ tavernContentTypes }
					OptionsComponent={ TavernOptions }
				/>
			</Router>
		</>
	);
};

export default SubmitForm;
