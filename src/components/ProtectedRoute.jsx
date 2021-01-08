import { React } from "react";
import { Redirect, Route } from "react-router-dom";
import Auth from "./Auth";



const checkAuth = () => {
    return Auth.isLoggedIn()
}

export default function ProtectedRoute({component: Component, callback, ...rest}){

    callback = callback.bind(this)

    return (
        <Route {...rest} render={
            (props) => 
                callback()
                ?   <Component {...props} />
                :   (<Redirect to={{
                        pathname: "/",
                        state: {
                            from: props.location
                        }
                    }} />)
                
            } />
    )
}