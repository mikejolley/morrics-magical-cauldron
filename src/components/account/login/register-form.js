/**
 * External dependencies
 */
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';
import PasswordStrengthBar from 'react-password-strength-bar';

/**
 * Internal dependencies
 */
import Field from '@components/field';
import { useRegistration } from '@hooks';

export const RegisterForm = () => {
	const [ username, setUsername ] = useState( '' );
	const [ email, setEmail ] = useState( '' );
	const [ password, setPassword ] = useState( '' );
	const { register, error, status } = useRegistration();
	const [ passwordError, setPasswordError ] = useState( '' );

	const onRegister = ( e ) => {
		e.preventDefault();
		setPasswordError( '' );
		if ( username.length === 0 ) {
			setPasswordError( 'Please enter a username.' );
			return;
		}
		if ( email.length === 0 ) {
			setPasswordError( 'Please enter your email address.' );
			return;
		}
		if ( password.length === 0 ) {
			setPasswordError( 'Please enter a password.' );
			return;
		}
		register( username, email, password );
	};

	return (
		<form onSubmit={ onRegister } className="register-form">
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
				label="Username"
				value={ username }
				onChange={ ( value ) => setUsername( value ) }
				placeholder="Enter a username"
				disabled={ status === 'resolving' }
				description={
					'Your username will be shown alongside any content you submit. It cannot be changed.'
				}
			/>
			<Field
				label="Email"
				value={ email }
				onChange={ ( value ) => setEmail( value ) }
				placeholder="Enter your email address"
				disabled={ status === 'resolving' }
			/>
			<Field
				label="Password"
				type="password"
				value={ password }
				placeholder="Choose a password"
				onChange={ ( value ) => setPassword( value ) }
				disabled={ status === 'resolving' }
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
			<p>
				<button
					className="button button--inline button--large"
					onClick={ onRegister }
					disabled={ status === 'resolving' }
				>
					Create Account
				</button>
			</p>
		</form>
	);
};

export default RegisterForm;
