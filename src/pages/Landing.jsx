import React from 'react';
import Auth from '../components/Auth';
import Button from '../components/Button/Button';
import TextField from '../components/Inputs/TextField';



import '../styles/pages/landing.css';


function Landing(props) {

    const handleLogin = async (e) => {
        e.preventDefault()
        if(await Auth.login(e.target.username.value, e.target.password.value))
            props.history.push('/app')
        
    }

    return (
        <div id="landing-page">
            <div className="content-wrapper">
                <form onSubmit={handleLogin}>
                    <div className="form-control">
                        <TextField name="username" placeholder="Username" required/>
                    </div>
                    <div className="form-control">
                        <TextField name="password" placeholder="Password" required/>
                    </div>
                    <div className="form-control">
                        <Button onSubmit={handleLogin} title="Log in" expanded/>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Landing;