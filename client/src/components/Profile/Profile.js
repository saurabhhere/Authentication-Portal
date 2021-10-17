import React from "react";
import './Profile.css';
import {connect} from 'react-redux'
import {FiLogOut} from 'react-icons/fi'
import { logoutUser } from '../../actions/authActions';
import { useHistory } from 'react-router-dom';
import url from '../../misc/url';

const Profile = (props) => {
    
    const {user} = props.auth;
    const history = useHistory();

    const Logout = async e => {
        props.logoutUser(props.history)
    }

    return (
    <div className="profile-container">
        
        <div className="profile">
        <button className="profile-button" onClick={Logout}><FiLogOut/></button>
        <div className="profile-img">
            <img src={`${url.serverURL}/uploads/images/${user.image}`} alt="img" />
        </div>
        <div className="profile-content">
            <div className="profile-detail">
            <h2>{user.name}<br /><span>{user.email}</span></h2>
            </div>
        </div>
        </div>
    </div>
    )
}

const mapStateToProps = state => ({
	auth: state.auth
}) 

export default connect(mapStateToProps, {logoutUser})(Profile)