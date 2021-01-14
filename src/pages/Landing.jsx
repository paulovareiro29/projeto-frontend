import React, { useEffect, useState } from 'react';
import API from '../components/API';
import Auth from '../components/Auth';

import LoginForm from '../components/LoginForm/LoginForm';



import '../styles/pages/landing.css';


function Landing(props) {

    const [checked, setChecked] = useState(false)

    useEffect(() => {
        async function checkUser(){
            if(Auth.getToken()){
                await fetch(`${API.getURL()}/user/token/${Auth.getToken()}`,
                    {
                        method: "GET",
                        headers: { "content-type": "application/json" },
                        mode: 'cors'
                    })
                    .then(res => res.json())
                    .then((result) => {
                        props.history.push("/app")
                    })
                    .catch((err) => {
                      });
            }
        }

        if(!checked){
            checkUser()
            setChecked(true)
        }
            
    }, [checked, props.history])
        
    if(!checked) return null

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