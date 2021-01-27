/**
 * External dependencies
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export const Success = ( { children } ) => {
	return (
		<div className="success-notice hero">
			<FontAwesomeIcon icon={ faCheckCircle } aria-hidden={ true } />
			{ children }
		</div>
	);
};

export default Success;
