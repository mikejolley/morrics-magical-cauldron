/**
 * External dependencies
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';

export const Success = ( { children, hero = true } ) => {
	const classes = classnames( 'success-notice', {
		'success-notice--hero': hero,
	} );
	return (
		<div className={ classes }>
			<FontAwesomeIcon icon={ faCheckCircle } aria-hidden={ true } />
			{ children }
		</div>
	);
};

export default Success;
