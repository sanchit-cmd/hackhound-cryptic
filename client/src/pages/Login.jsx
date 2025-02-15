import React from 'react';
import '../styles/Login.css';

function Login() {
	return (
		<div className='login-container'>
			<div className='login-box'>
				<h1 className='login-title'>Cryptic Hunt</h1>
				<button className='login-button'>Login with Google</button>
			</div>
		</div>
	);
}

export default Login;
