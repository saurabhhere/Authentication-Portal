import React, {useEffect, useState} from 'react';
import './Login.css';

const Login = () => {

    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('login_container');

        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });
    }, [])

    return (
		<div className="login_flex_container">
		<div className="login_container" id="login_container">
			<div className="form-container sign-up-container">
				<form action="#">
					<h1 className="login_heading">Create Account</h1>
					<div className="social-container">
						<a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
					</div>
					<span className="login_info">or use your email for registration</span>
					<input className="login_input" type="text" placeholder="Name" />
					<input className="login_input" type="email" placeholder="Email" />
					<input className="login_input" type="password" placeholder="Password" />
					<input className="login_input" type="password" placeholder="Check Password" />
					<input className="login_input" type="password" placeholder="Check Password" />

					<button className="login_button">Sign Up</button>
				</form>
			</div>
			<div className="form-container sign-in-container">
				<form>
					<h1 className="login_heading">Sign in</h1>
					<div className="social-container">
						<a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
					</div>
					<span className="login_info">or use your account</span>
					<input className="login_input" type="email" placeholder="Email" />
					<input className="login_input" type="password" placeholder="Password" />
						<a href="#">Forgot your password?</a>
					<button className="login_button">Sign In</button>
				</form>
			</div>
			<div className="overlay-container">
				<div className="overlay">
					<div className="overlay-panel overlay-left">
						<h1 className="login_heading">Welcome Back!</h1>
						<div className="login_description">Please login with your personal info here</div>
						<button className="login_button ghost" id="signIn">Sign In</button>
					</div>
					<div className="overlay-panel overlay-right">
						<h1 className="login_heading">Hello, Friend!</h1>
						<div className="login_description">Enter your personal details to sign up here</div>
						<button className="login_button ghost" id="signUp">Sign Up</button>
					</div>
				</div>
			</div>
		</div>
		</div>
    )
}

export default Login;