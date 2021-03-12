/**
 * External dependencies
 */
import { Link, Router } from '@reach/router';

/**
 * Internal dependencies
 */
import LoginForm from './login-form';
import RegisterForm from './register-form';

const Login = () => {
	return (
		<div className="section login">
			<hgroup>
				<h2>Sign in</h2>
				<div>
					<p>
						Sign in, or create an account, if you would like to
						submit new content for the generators. Lost your
						password?{ ' ' }
						<Link to="reset" className="link-button">
							Reset it here
						</Link>
						.
					</p>
				</div>
			</hgroup>
			<nav className="tab-nav">
				<Link to="">Sign in</Link>
				<Link to="create-account">Create Account</Link>
			</nav>
			<Router primary={ false }>
				<LoginForm path="/" />
				<RegisterForm path="/create-account" />
			</Router>
		</div>
	);
};

export default Login;
