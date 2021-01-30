/**
 * External dependencies
 */
import { Router } from '@reach/router';

/**
 * Internal dependencies
 */
import { useAuth } from '@hooks';
import Profile from './profile';
import Login from './login';
import { ResetPasswordEmail, ResetPassword } from './reset';
import { SiteNotFound } from '@components/site';

export const Account = () => {
	const { isLoggedIn } = useAuth();
	const ViewComponent = isLoggedIn ? Profile : Login;
	return (
		<Router>
			<SiteNotFound default />
			<ViewComponent path="/*" />
			<ResetPasswordEmail path="/reset" />
			<ResetPassword path="/reset/:resetLogin/:resetKey" />
		</Router>
	);
};

export default Account;
