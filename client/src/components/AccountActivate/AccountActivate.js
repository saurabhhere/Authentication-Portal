import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import url from '../../misc/url';
import { toast } from 'react-toastify';
import './AccountActivate.css';

const AccountActivate = () => {

    const { token } = useParams();
    const [status, setStatus] = useState(false);

    const history = useHistory();

    const activateReq = async (e) => {
        await axios.post(`${url.serverURL}/user/email-activate`, {token})
        .then((res) => {
            console.log(res);
            accountActivateToast();
            setStatus(true);
            setTimeout(() => {
                history.push('/user/login');
            }, 2000);
        }).catch((error) => {
            console.log(error);
        })
    }
    
    const accountActivateToast = () => {
        toast.success('Account activated successfully!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
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

export default AccountActivate
