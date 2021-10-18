import React from 'react';
import './Navbar.css';
import {connect} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import { logoutUser } from '../../actions/authActions';

const Navbar = (props) => {

    const history = useHistory();
    
    const Logout = async e => {
        props.logoutUser(history)
    }

    const {isAuthenticated} = props.auth;

    return (
        <div className="navbar">
            <div className="logo"><Link to="/">Spark</Link></div>
            <div className="navbar-items">
                <div className="navbar-item"><Link to="/">Home</Link></div>
                <div className="navbar-item"><Link to="/user/profile">Profile</Link></div>
                {isAuthenticated ? (
                    <div className="navbar-item" onClick={Logout}>Logout</div>
                ) : (
                    <div className="navbar-item"><Link to="/user/login">Login</Link></div>
                )}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logoutUser})(Navbar);