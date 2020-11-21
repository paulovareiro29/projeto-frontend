import { getByTestId } from '@testing-library/react';
import Cookies from 'universal-cookie'

const cookies = new Cookies()


class Auth {

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
                    cookies.set('access_token', response.token)
                    console.log(this.getToken())
                    return true
                }
                return false
            })

        if (this.getToken())
            return true

        return false
    }

    logout() {
        cookies.remove('access_token')
        return true
    }

    async getToken() {
        const get = async () => {
            return cookies.get('access_token')
        }

        const cookie = await get() 
        return cookie
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