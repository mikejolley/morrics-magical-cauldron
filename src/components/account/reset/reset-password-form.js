/**
 * External dependencies
 */
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';
import { Link } from '@reach/router';
import PasswordStrengthBar from 'react-password-strength-bar';

/**
 * Internal dependencies
 */
import Field from '@components/field';
import { useResetPassword } from '@hooks';
import Success from '@components/success';

export const ResetPasswordForm = ( { resetLogin, resetKey } ) => {
	const [ password, setPassword ] = useState( '' );
	const [ password2, setPassword2 ] = useState( '' );
	const [ passwordError, setPasswordError ] = useState( '' );
	const { resetUserPassword, error, status } = useResetPassword();

	const onReset = ( e ) => {
		e.preventDefault();
		setPasswordError( '' );
		if ( password.length === 0 ) {
			setPasswordError( 'You must enter a new password.' );
			return;
		}
		if ( password2.length === 0 ) {
			setPasswordError( 'You must re-enter your new password.' );
			return;
		}
		if ( password !== password2 ) {
			setPasswordError( 'Passwords do not match!' );
			return;
		}
		resetUserPassword( resetKey, resetLogin, password );
	};

	if ( status === 'resolved' && ! error ) {
		return (
			<Success>
				<p>
					Your password has been reset. You can now{ ' ' }
					<Link to="/account" className="link-button">
						Login
					</Link>
					.
				</p>
			</Success>
		);
	}

	return (
		<form onSubmit={ onReset } className="reset-form">
			{ ( error || passwordError ) && (
				<div className="error-notice">
					<FontAwesomeIcon
						icon={ faSkullCrossbones }
						aria-hidden={ true }
					/>
					<p>{ passwordError || error }</p>
				</div>
			) }
			<Field
				label="New password"
				type="password"
				value={ password }
				onChange={ setPassword }
			/>
			<PasswordStrengthBar
				password={ password }
				scoreWords={ [
					'critical fail',
					'okay',
					'good',
					'strong',
					'critical roll!',
				] }
				shortScoreWord={ 'critical fail' }
			/>
			<Field
				label="Re-enter your new password"
				type="password"
				value={ password2 }
				onChange={ setPassword2 }
			/>
			<button
				className="button button--inline button--large"
				onClick={ onReset }
				disabled={ status === 'resolving' }
			>
				Set New Password
			</button>
		</form>
	);
};

export default ResetPasswordForm;
