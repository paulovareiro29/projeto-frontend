import React from 'react';
import Auth from '../components/Auth';

import LoginForm from '../components/LoginForm/LoginForm';



import '../styles/pages/landing.css';


function Landing(props) {

    if(Auth.getToken())
        props.history.push("/app")

    return (
        <div id="landing-page">
            <div className="content-wrapper">
                <div className="landing-page-title">
                    <span>Sign in to <strong>Fitness Club</strong></span>
                </div>
                <LoginForm {...props}/>
            </div>
        </div>

    );
}

export default Landing;