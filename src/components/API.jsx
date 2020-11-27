import { Component } from 'react'


class API extends Component{

    async getUsers(){
        let response

        await fetch(`http://localhost/projeto-backend/user/`,
        {
            method: "GET",
            headers: { "content-type": "application/json" },
            mode: 'cors'
        })
        .then(res => res.json())
        .then((result) => {
            response = result
        })

        return response
    }

    async getUser(id){
        let response

        await fetch(`http://localhost/projeto-backend/user/${id}`,
        {
            method: "GET",
            headers: { "content-type": "application/json" },
            mode: 'cors'
        })
        .then(res => res.json())
        .then((result) => {
            response = result
        })

        return response
    }

    async getUserByToken(token){
        let response

        await fetch(`http://localhost/projeto-backend/user/token/${token}`,
            {
                method: "GET",
                headers: { "content-type": "application/json" },
                mode: 'cors'
            })
            .then(res => res.json())
            .then((result) => {
                response = result
            })

        return response
    }

}

export default new API()