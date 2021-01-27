/**
 * External dependencies
 */
import { useState } from 'react';
import { Link } from '@reach/router';

/**
 * Internal dependencies
 */
import LoginForm from './login-form';
import RegisterForm from './register-form';

const Login = () => {
	const [ section, setSection ] = useState( 'login' );

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
				<ul>
					<li className={ section === 'login' ? 'active' : '' }>
						<button
							className="link-button"
							onClick={ () => setSection( 'login' ) }
						>
							Sign in
						</button>
					</li>
					<li
						className={
							section === 'create-account' ? 'active' : ''
						}
					>
						<button
							className="link-button"
							onClick={ () => setSection( 'create-account' ) }
						>
							Create Account
						</button>
					</li>
				</ul>
			</nav>
			{ section === 'login' ? <LoginForm /> : <RegisterForm /> }
		</div>
	);
};

export default Login;
