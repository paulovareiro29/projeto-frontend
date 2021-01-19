import { Component } from 'react'
import Cookies from 'universal-cookie'

const cookies = new Cookies()


class Auth extends Component{
    constructor() {
        super()
        this.state = {token: undefined}
    }

    async login(username, password) {

        await fetch("http://localhost/projeto-backend/login",
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
            .then((response) => {
                if (response.token){
                    this.setToken(response.token)
                    console.log("Logged in: token = " + response.token)
                }
                console.log(response)
            })
        
        
    }

    async logout() {
        /*cookies.remove('access_token',{path: '/app', domain: "localhost"})
        cookies.remove('access_token',{path: '/', domain: "localhost"})*/

        await cookies.remove('access_token')
        return true
    }

    getToken() {
        /*const token_app = cookies.get('access_token',{path: '/app', domain: "localhost"})
        const token_root = cookies.get('access_token',{path: '/', domain: "localhost"})

        if(!token_root && !token_app) return undefined;
        if(!token_root && token_app) return token_app;
        if(token_root && !token_app) return token_root;
        if(token_root && token_app) return token_root;
        //console.log("GetToken: token = " + token)*/

        return cookies.get('access_token')
    }

    async setToken(token) {
        /*cookies.set('access_token', token, {path: '/app', domain: "localhost"})
        cookies.set('access_token', token, {path: '/', domain: "localhost"})
        console.log("SetToken: token = " + token)*/

        await cookies.set('access_token', token)
    }


    isLoggedIn() {
        if (this.getToken() === undefined)
            return false

        return true
    }


}

export default new Auth()