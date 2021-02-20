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
						Submit content for the NPC generator using the form
						below!{ ' ' }
						{ viewer && (
							<>
								You are currently submitting content as{ ' ' }
								<strong>{ viewer.username }</strong>.
							</>
						) }
					</p>
				) : (
					<p>
						Submit content for the NPC generator using the form
						below! To have your name associated with submitted
						content, you can optionally{ ' ' }
						<Link to="/account" className="link-button">
							sign in or create an account here
						</Link>
						. Guest submissions will be moderated.
					</p>
				) }
			</div>
			<SubmitContentForm />
		</>
	);
};

export default SubmitForm;
