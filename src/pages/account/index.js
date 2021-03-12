/**
 * External dependencies
 */
import { Router } from '@reach/router';

/**
 * Internal dependencies
 */
import { useAuth } from 'hooks';
import Profile from './profile';
import Login from './login';
import { ResetPasswordEmail, ResetPassword } from './reset';
import { NotFound } from 'pages';

const Account = () => {
	const { isLoggedIn } = useAuth();
	const ViewComponent = isLoggedIn ? Profile : Login;
	return (
		<Router>
			<NotFound default />
			<ViewComponent path="/*" />
			<ResetPasswordEmail path="/reset" />
			<ResetPassword path="/reset/:resetLogin/:resetKey" />
		</Router>
	);
};

export default Account;
