/**
 * External dependencies
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';

const Error = () => {
	return (
		<div className="error-state">
			<FontAwesomeIcon icon={ faSkullCrossbones } />
			<p>There was an error :(</p>
		</div>
	);
};

export default Error;
