/**
 * Internal dependencies
 */
import { useAuth } from '@hooks';
import Profile from './profile';
import Login from './login';

export const Account = () => {
	const { isLoggedIn } = useAuth();
	const ViewComponent = isLoggedIn ? Profile : Login;
	return <ViewComponent path="/" />;
};

export default Account;
