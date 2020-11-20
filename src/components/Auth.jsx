import { React, useState } from 'react';
import Cookies from 'universal-cookie'

const cookies = new Cookies()


class Auth {
    
    login(username, password) {

        if(!username|| !password ){
            console.log("Fields cannot be empty")
            return false;
        }
            
        fetch("http://localhost/projeto-backend/login",
        {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                "username": username,
                "pass": password,
            }),
            mode: 'cors'
        })
        .then(res => res.json())
        .then((response) =>{
            if(response.token)
                this.setState({token: response.token})
                console.log(this.state.token)
        })

        console.log(this.state.token)

        if(this.state.token){
            
            cookies.set('access_token',this.state.token)
            return true
        }
        return false
    }

    logout(){
        cookies.remove('access_token')
        return true
    }

    getToken(){
        return cookies.get('access_token')
    }

    isLoggedIn(){
        if(this.getToken() === undefined)
            return false

        return true
    }

    isAtleta(){
        return true
    }

    isTreinador(){
        return true
    }
    
    isAdmin(){
        return true
    }

    isAny(){
        return (this.isAdmin() || this.isAtleta() || this.isTreinador())
    }


}

export default new Auth()