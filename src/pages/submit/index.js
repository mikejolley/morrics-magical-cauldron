/**
 * External dependencies
 */
import { Link } from '@reach/router';

/**
 * Internal dependencies
 */
import SubmitForm from './submit-form';
import { useAuth } from 'hooks';
import './style.scss';
import Loading from 'components/loading';

const Submit = () => {
	const { isLoggedIn, viewer, loadingViewer } = useAuth();

	if ( loadingViewer ) {
		return <Loading message={ 'Loading submission form...' } />;
	}

	return (
		<div className="section submit-content">
			<hgroup>
				<h2>Submit Content</h2>
				<div>
					{ isLoggedIn ? (
						<p>
							Submit content to the content generators below!{ ' ' }
							{ viewer && (
								<>
									You are currently submitting content as{ ' ' }
									<strong>{ viewer.username }</strong>.
								</>
							) }
						</p>
					) : (
						<p>
							Submit content to the content generators below! To
							be credited, you can{ ' ' }
							<Link to="/account" className="link-button">
								sign in or create an account here
							</Link>
							.
						</p>
					) }
				</div>
			</hgroup>
			<SubmitForm />
		</div>
	);
};

export default Submit;
