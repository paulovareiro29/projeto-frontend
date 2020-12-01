import { Component } from 'react'


class API extends Component{

    constructor(){
        super()
        this.url = "http://localhost/projeto-backend"
    }

    async getUsers(){
        let response

        await fetch(`${this.url}/user/`,
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

        await fetch(`${this.url}/user/${id}`,
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

        await fetch(`${this.url}/user/token/${token}`,
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

    async getExercises(){
        let response

        await fetch(`${this.url}/exercicio/`,
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