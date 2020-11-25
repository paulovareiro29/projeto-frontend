import React from 'react';
import Form from '../components/Form/Form';
import Input from '../components/Inputs/Input';
import LoginForm from '../components/LoginForm/LoginForm';

//import LoginForm from '../components/LoginForm/LoginForm';



import '../styles/pages/landing.css';


function Landing(props) {

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