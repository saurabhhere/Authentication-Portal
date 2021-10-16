import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import {connect} from 'react-redux';
import {activateUser} from '../../actions/authActions';
import './AccountActivate.css';

const AccountActivate = (props) => {

    const { token } = useParams();
    const [status, setStatus] = useState(false);

    const activateReq = async (e) => {
        props.activateUser({token}, props.history, setStatus);
    }

    return (
        <div className="account-activate">
        <div className="account-activate-container">
            <div className="account-activate-heading">Activate Account</div>
            {   
                status ? (
                    <div className="account-activate-flex">
                        Your Account Activated Successfully. 
                    </div>
                ) : (   
                        <div className="account-activate-flex">
                            <div>Please Click on below button to activate your account</div>
                            <div className="activate-btn" onClick={activateReq}>Activate</div>
                        </div>
                )
            }
        </div>
        </div>
    )
}

export default connect(null, {activateUser})(AccountActivate)
