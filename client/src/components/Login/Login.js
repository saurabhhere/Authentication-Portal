import React, {useEffect, useState} from 'react';
import './Login.css';
import {connect} from 'react-redux';
import { loginUser, registerUser } from '../../actions/authActions';
import { useHistory } from 'react-router-dom';

const Login = (props) => {

    const [loginEmail, setloginEmail] = useState('');
    const [loginPassword, setloginPassword] = useState('');
    const [registerUsername, setregisterUsername] = useState('')
    const [registerEmail, setregisterEmail] = useState('')
    const [registerPassword, setregisterPassword] = useState('')
    const [registerCheckPassword, setregisterCheckPassword] = useState('')
    const [registerImage, setRegisterImage] = useState('');
    const [error, setError] = useState('');

    const history = useHistory();

    useEffect(() => {
        if (props.auth.isAuthenticated) {
            props.history.push("/user/profile");
          }
        if (props.errors){
            setError(props.errors.msg)
        }
    }, [props])

	const submitLogin = async (e) => {
        e.preventDefault();
        try {
            const userData = { loginEmail, loginPassword };
            props.loginUser(userData);
        } catch (error) {
            console.log(error);
            if (error.response){
                setError(error.response.data.msg)
            } else {
                console.log(error);
            }
        }
    }

	const submitRegister = async (e) => {
        e.preventDefault();
        try {
            const newUser = new FormData();
            newUser.append('registerUsername', registerUsername);
            newUser.append('registerEmail', registerEmail);
            newUser.append('registerPassword', registerPassword);
            newUser.append('registerCheckPassword', registerCheckPassword);
            newUser.append('registerImage', registerImage);
            props.registerUser(newUser, props.history, callback);

            function callback(){
                setregisterUsername('');
                setregisterEmail('');
                setregisterPassword('');
                setregisterCheckPassword('');
            }

        } catch (error) {
            console.log(error.response);
            if (error.response){
                setError(error.response.data.msg)
            } else {
                console.log(error);
            }
        }
    }

    const fileSelectHandler = (e) => {
        e.preventDefault();
        setRegisterImage(e.target.files[0]);
    };

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
					<input className="login_input" type="text" placeholder="Name" onChange={e => setregisterUsername(e.target.value)} value={registerUsername} required/>
					<input className="login_input" type="email" placeholder="Email" onChange={e => setregisterEmail(e.target.value)} value={registerEmail} required/>
					<input className="login_input" type="password" placeholder="Password" onChange={e => setregisterPassword(e.target.value)} value={registerPassword} required/>
					<input className="login_input" type="password" placeholder="Confirm Password" onChange={e => setregisterCheckPassword(e.target.value)} value={registerCheckPassword} required/>
					<input className="login_input" type="file" name="registerImage" accept=".png, .jpg, .jpeg" onChange={fileSelectHandler}/>
					<div className="form_error">
                            {error}
                	</div>
					<button className="login_button" onClick={submitRegister}>Sign Up</button>
				</form>
			</div>
			<div className="form-container sign-in-container">
				<form>
					<h1 className="login_heading">Sign in</h1>
					<div className="social-container">
						<a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
					</div>
					<span className="login_info">or use your account</span>
					<input className="login_input" type="email" placeholder="Email" onChange={e => setloginEmail(e.target.value)} value={loginEmail} required />
					<input className="login_input" type="password" placeholder="Password" onChange={e => setloginPassword(e.target.value)} value={loginPassword} required />
						<a href="#">Forgot your password?</a>
						<div className="form_error">
                            {error}
                </div>
					<button className="login_button" onClick={submitLogin}>Sign In</button>
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

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });

export default connect(mapStateToProps, {registerUser, loginUser})(Login);