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

    logout() {
        cookies.remove('access_token')
        console.log("Logged out: token = " + this.getToken())
        return true
    }

    getToken() {
        const token = cookies.get('access_token')
        console.log("GetToken: token = " + token)
        return token
    }

    setToken(token) {
        cookies.set('access_token', token)
        console.log("SetToken: token = " + token)
    }


    isLoggedIn() {
        if (this.getToken() === undefined)
            return false

        return true
    }


}

export default new Auth()