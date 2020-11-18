import Cookies from 'universal-cookie'

const cookies = new Cookies()


class Auth {

    

    login() {
        cookies.set('access_token', 'user')
    }

    logout(){
        cookies.remove('access_token')
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