import React from 'react';
import Form from '../components/Form/Form';
import Input from '../components/Inputs/Input';

//import LoginForm from '../components/LoginForm/LoginForm';



import '../styles/pages/landing.css';


function Landing(props) {

    return (
        <div id="landing-page">
            <div className="content-wrapper">
                <Form submitBtnName="Log in" onSubmit={(e) => {
                    
                }}>
                    <Input name="username" placeholder="Username" rules={{required: "This is required", minLength: {value : 3, message: 'Minimo de 3 caracteres'}}}/>
                    <Input name="usernme" placeholder="Username"/>
                    <Input name="userme" placeholder="Username"/>
                </Form>
            </div>
        </div>

    );
}

export default Landing;