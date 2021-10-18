import React from 'react';
import Background from './bg.svg'
import './Homepage.css'

const Homepage = () => {
    return (
        <div className="homepage">
            <div className="homepage-tagline">Demo Portal for SPARK</div>
            <div className="homepage-img">
                <img src={Background} />
            </div>
        </div>
    )
}

export default Homepage;