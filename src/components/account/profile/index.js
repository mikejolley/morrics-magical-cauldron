/**
 * Internal dependencies
 */
import { useAuth } from '@hooks';
import Loading from '@components/loading';
import ProfileForm from './profile-form';

export const Profile = () => {
	const { viewer, loadingViewer, logout } = useAuth();

	if ( loadingViewer || ! viewer ) {
		return <Loading message={ 'Loading user profile...' } />;
	}

	return (
		<div className="section profile">
			<hgroup>
				<h2>Account</h2>
				<div>
					<p>
						Edit your account details below, or{ ' ' }
						<button onClick={ logout } className="link-button">
							sign out here
						</button>
						.
					</p>
				</div>
			</hgroup>
			<ProfileForm viewer={ viewer } />
		</div>
	);
};

export default Profile;
