/**
 * External dependencies
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';

const Loading = ( { className = '', message = 'Reticulating Splines...' } ) => {
	return (
		<div className={ classnames( 'loading-state', className ) }>
			<FontAwesomeIcon icon={ faSpinner } pulse />
			{ message && <p>{ message }</p> }
		</div>
	);
};

export default Loading;
