/**
 * External dependencies
 */
import { Link } from '@reach/router';

/**
 * Internal dependencies
 */
import Loading from '@components/loading';
import { useAuth } from '@hooks';
import SubmitContentForm from './submit-content-form';

const SubmitForm = () => {
	const { isLoggedIn, viewer, loadingViewer } = useAuth();

	if ( loadingViewer ) {
		return <Loading message={ 'Loading submission form...' } />;
	}

	return (
		<>
			<div className="npc-generator__submit content-box">
				{ isLoggedIn ? (
					<p>
						Approved content will be used randomly when a new NPC is
						generated.{ ' ' }
						{ viewer && (
							<>
								You are currently submitting content as{ ' ' }
								<strong>{ viewer.username }</strong>.
							</>
						) }
					</p>
				) : (
					<>
						Only signed in users can submit content. You can{ ' ' }
						<Link to="/account" className="link-button">
							sign in or create an account here.
						</Link>
					</>
				) }
			</div>
			{ isLoggedIn && <SubmitContentForm /> }
		</>
	);
};

export default SubmitForm;
