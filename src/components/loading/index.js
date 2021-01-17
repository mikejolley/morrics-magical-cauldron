/**
 * External dependencies
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Loading = () => {
	return (
		<div className="loading-state">
			<FontAwesomeIcon icon={ faSpinner } pulse />
			<p>Reticulating Splines...</p>
		</div>
	);
};

export default Loading;
