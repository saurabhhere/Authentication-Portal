import React, { useState, useEffect } from 'react'
import './ForgotPassword.css';
import {connect} from 'react-redux';
import { forgotpassword } from '../../actions/authActions';

const ForgotPassword = (props) => {

    const [resetEmail, setResetEmail] = useState('');
    const [error, setError] = useState('');

    const handleForgotPassword = async (e) => {
        try {
            props.forgotpassword({resetEmail});
        } catch (error) {
            if (error.response){
                setError(error.response.data.msg);
            }
        }
    }

    useEffect(() => {
        setError(props.errors.msg);
    }, [props])

    return (
        <div className="account-activate">
        <div className="account-activate-container">
            <div className="account-activate-heading">Forgot Password</div>
                <div className="account-activate-flex">
					<input className="login_input" type="email" placeholder="Email" onChange={e => setResetEmail(e.target.value)} value={resetEmail} required/>
                    <div className="form_error">
                            {error}
                        </div>
                    <div className="forgot-password-btn" onClick={handleForgotPassword}>Send Reset Link</div>
                </div>
        </div>
        </div>
    )
}

const mapStateToProps = state => ({
    errors: state.errors
  });


export default connect(mapStateToProps, {forgotpassword})(ForgotPassword);
