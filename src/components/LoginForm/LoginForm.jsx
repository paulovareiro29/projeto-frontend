import { React, useState } from "react";
import Auth from "../Auth";
import Form from "../Form/Form";
import Input from "../Inputs/Input";

import './loginform.css'

export default function LoginForm(props) {

    const [wrongInfo, setWrongInfo] = useState(false)

    const onSubmit = async (e) => {
        await Auth.login(e.username, e.password)

        if (Auth.getToken()) {
            props.history.push('/app')
        } else {
            setWrongInfo(true)
        }
    }

    return (
        <div className="login-form">
            <div className={"error-info " + (wrongInfo ? '' : 'hidden')}>
                <span>Username ou password errada</span>
            </div>
            <div className="form">
                <Form submitBtnName="Log in" onSubmit={onSubmit}>

                    <Input type="text" name="username" placeholder="Username" rules={
                        {
                            required: "This is required"
                        }
                    } />
                    <Input type="password" name="password" placeholder="Password" rules={
                        {
                            required: "This is required"
                        }
                    } />
                </Form>
            </div>

        </div>
    )
}