/**
 * External dependencies
 */
import { Link, Router } from '@reach/router';

/**
 * Internal dependencies
 */
import Generator from './generator';
import './style.scss';

const TavernGenerator = () => {
	return (
		<div className="tavern-generator">
			<hgroup>
				<h2>Tavern Generator</h2>
			</hgroup>
			<Generator />
		</div>
	);
};

export default TavernGenerator;
