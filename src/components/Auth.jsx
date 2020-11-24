import { Component } from 'react'
import Cookies from 'universal-cookie'

const cookies = new Cookies()


class Auth extends Component{
    constructor() {
        super()
        this.state = {token: undefined}
    }

    async login(username, password) {

        if (!username || !password) {
            console.log("Fields cannot be empty")
            return false;
        }

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
                if (response.token) {
                    this.setToken(response.token)
                    return true
                }
                return false
            })

        let token = this.getToken()

        console.log(token)

        if (token !== undefined)
            return true
        
        return false
    }

    logout() {
        cookies.remove('access_token')
        return true
    }

    getToken() {
        const token = cookies.get('access_token')
        return token
    }

    setToken(token) {
        cookies.set('access_token', token)
    }


    isLoggedIn() {
        if (this.getToken() === undefined)
            return false

        return true
    }

    isAtleta() {
        return true
    }

    isTreinador() {
        return true
    }

    isAdmin() {
        return true
    }

    isAny() {
        return (this.isAdmin() || this.isAtleta() || this.isTreinador())
    }


}

export default new Auth()