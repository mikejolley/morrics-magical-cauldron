/**
 * External dependencies
 */
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheckCircle,
	faSkullCrossbones,
} from '@fortawesome/free-solid-svg-icons';

/**
 * Internal dependencies
 */
import Field from 'components/field';
import { useUpdateUser } from 'hooks';

export const ProfileForm = ( { viewer } ) => {
	const [ email, setEmail ] = useState( viewer.email );
	const [ password, setPassword ] = useState( '' );
	const [ password2, setPassword2 ] = useState( '' );
	const [ passwordError, setPasswordError ] = useState( '' );
	const { updateUser, error, status } = useUpdateUser( viewer.id );
	const hasError = error || passwordError;

	const onSubmit = ( e ) => {
		e.preventDefault();
		setPasswordError( '' );
		if ( password.length && password2.length === 0 ) {
			setPasswordError( 'You must re-enter your new password.' );
			return;
		}
		if ( password !== password2 ) {
			setPasswordError( 'Passwords do not match!' );
			return;
		}
		updateUser( email, password );
	};

	return (
		<form onSubmit={ onSubmit } className="profile-form">
			{ hasError && (
				<div className="error-notice">
					<FontAwesomeIcon
						icon={ faSkullCrossbones }
						aria-hidden={ true }
					/>
					<p>{ passwordError || error }</p>
				</div>
			) }
			{ ! hasError && status === 'resolved' && (
				<div className="success-notice">
					<FontAwesomeIcon
						icon={ faCheckCircle }
						aria-hidden={ true }
					/>
					<p>Profile updated.</p>
				</div>
			) }
			<Field
				label="Email address"
				type="text"
				value={ email }
				onChange={ setEmail }
			/>
			<Field
				label="Change password (optional)"
				type="password"
				value={ password }
				onChange={ setPassword }
				placeholder={ 'Leave blank to keep current password' }
			/>
			<Field
				label="Re-enter your new password"
				type="password"
				value={ password2 }
				onChange={ setPassword2 }
			/>
			<button
				onClick={ onSubmit }
				className="button button--center button--large"
			>
				Update Details
			</button>
		</form>
	);
};

export default ProfileForm;
