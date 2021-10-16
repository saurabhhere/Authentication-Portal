import React, {useEffect, useState} from 'react';
import './Login.css';
import axios from 'axios';
import {connect} from 'react-redux';
import { updateUser, updateToken } from '../../actions/user';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import url from '../../misc/url';

const Login = (props) => {

    const [loginEmail, setloginEmail] = useState('');
    const [loginPassword, setloginPassword] = useState('');
    const [registerUsername, setregisterUsername] = useState('')
    const [registerEmail, setregisterEmail] = useState('')
    const [registerPassword, setregisterPassword] = useState('')
    const [registerCheckPassword, setregisterCheckPassword] = useState('')
    const [error, setError] = useState('');

    const history = useHistory();

	const submitLogin = async (e) => {
        e.preventDefault();
        try {
            const loginUser = { loginEmail, loginPassword };
            const loginResponse = await axios.post(`${url.serverURL}/user/login`, loginUser);
			console.log(loginResponse.data.token, loginResponse.data.user);
			props.updateUser(loginResponse.data.user);
			props.updateToken(loginResponse.data.token);
            if (loginResponse.data.token){
                localStorage.setItem("auth-token", loginResponse.data.token);
                history.push("/");
            }
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
            const newUser = { registerUsername, registerEmail, registerPassword, registerCheckPassword};
			console.log(newUser);
            await axios.post(`${url.serverURL}/user/register`, newUser).then(res => {
                console.log(res);
                notifyUser();
            });
        } catch (error) {
            console.log(error.response);
            if (error.response){
                setError(error.response.data.msg)
            } else {
                console.log(error);
            }
        }
    }

	const notifyUser = () => {
        toast.info('Please check your mail', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
		
	}

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
	user: state.user.user,
	token: state.user.token
}) 

export default connect(mapStateToProps, {updateUser, updateToken})(Login);