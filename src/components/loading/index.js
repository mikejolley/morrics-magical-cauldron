/**
 * External dependencies
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Loading = ( { message = 'Reticulating Splines...' } ) => {
	return (
		<div className="loading-state">
			<FontAwesomeIcon icon={ faSpinner } pulse />
			<p>{ message }</p>
		</div>
	);
};

export default Loading;
