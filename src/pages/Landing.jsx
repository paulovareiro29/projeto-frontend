import React from 'react';
import Auth from '../components/Auth';



import '../styles/pages/landing.css';


function Landing(props) {
    return (
        <div id="landing-page">
            <div className="content-wrapper">
                Landing Page
                <button onClick={
                    () => {
                        Auth.login()
                        props.history.push('/app')
                    }
                }>Go to App</button>
            </div>
        </div>

    );
}

export default Landing;