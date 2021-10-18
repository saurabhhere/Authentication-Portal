import React, { useState, useEffect} from 'react'
import './ResetPassword.css';
import {connect} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom'
import { resetpassword } from '../../actions/authActions';

const ResetPassword = (props) => {

    const [newPassword, setnewPassword] = useState('');
    const [newPasswordCheck, setnewPasswordCheck] = useState('');
    const [error, setError] = useState('');
    const { token } = useParams();

    const history = useHistory();

    const handleResetPassword = async (e) => {
        try {
            const password = {newPassword, newPasswordCheck, token};
            props.resetpassword(password, props.history);
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
            <div className="account-activate-heading">Reset Password</div>
                <div className="account-activate-flex">
					<input className="login_input" type="password" placeholder="New Password" onChange={e => setnewPassword(e.target.value)} value={newPassword} required/>
					<input className="login_input" type="password" placeholder="New Password Again" onChange={e => setnewPasswordCheck(e.target.value)} value={newPasswordCheck} required/>
                    <div className="form_error">
                            {error}
                        </div>
                    <div className="reset-password-btn" onClick={handleResetPassword}>Update Password</div>
                </div>
        </div>
        </div>
    )
}

const mapStateToProps = state => ({
    errors: state.errors
  });


export default connect(mapStateToProps, {resetpassword})(ResetPassword);
