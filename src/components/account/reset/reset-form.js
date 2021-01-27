/**
 * External dependencies
 */
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';

/**
 * Internal dependencies
 */
import Field from '@components/field';
import { useResetPassword } from '@hooks';
import Success from './success';

export const ResetForm = ( e ) => {
	const [ username, setUsername ] = useState( '' );
	const { sendResetPasswordEmail, error, status } = useResetPassword();

	const onReset = ( e ) => {
		e.preventDefault();
		sendResetPasswordEmail( username );
	};

	if ( status === 'resolved' && ! error ) {
		return (
			<Success>
				<p>Instructions have been emailed to you. Check your inbox.</p>
			</Success>
		);
	}

	return (
		<form onSubmit={ onReset } className="reset__form">
			{ error && (
				<div className="error-notice">
					<FontAwesomeIcon
						icon={ faSkullCrossbones }
						aria-hidden={ true }
					/>
					<p>{ error }</p>
				</div>
			) }
			<Field
				label="Username or Email Address"
				value={ username }
				onChange={ ( value ) => setUsername( value ) }
				disabled={ status === 'resolving' }
			/>
			<p>
				<button
					className="button button--inline button--large"
					onClick={ onReset }
					disabled={ status === 'resolving' }
				>
					Reset Password
				</button>
			</p>{ ' ' }
		</form>
	);
};

export default ResetForm;
