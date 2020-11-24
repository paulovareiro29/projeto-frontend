import { React } from "react";

import Button from "../Button/Button";
import TextField from "../Inputs/Input";


export default function LoginForm(props) {

    const validateForm = (form) => {
        console.log(form.username.value +"  " + form.password.value)
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        validateForm(e.target)

        /*if(await Auth.login(e.target.username.value, e.target.password.value))
            props.history.push('/app')*/
        
    }

    return (
        <form onSubmit={handleLogin}>
            <div className="form-control">
                <TextField name="username" placeholder="Username" required/>
            </div>
            <div className="form-control">
                <TextField name="password" placeholder="Password" />
            </div>
            <div className="form-control">
                <Button onSubmit={handleLogin} title="Log in" expanded />
            </div>
        </form>
    )
}