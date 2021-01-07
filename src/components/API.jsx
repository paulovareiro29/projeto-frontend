import { Component } from 'react'


class API extends Component {

    constructor() {
        super()
        this.url = "http://localhost/projeto-backend"
    }

    async getUsers() {
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

    async getUser(id) {
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

    async getUserByToken(token) {
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

    async getExercises() {
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

    async getExerciseTypes() {
        let response

        await fetch(`${this.url}/exercicio/tipoexercicio/`, {
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


    async createExercise(exercise) {
        if (exercise) {
            await fetch(`${this.url}/exercicio/`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(exercise),
                mode: 'cors'
            })
                .then(res => res.json())
                .then((res) => {
                    console.log(res)
                })
        }
    }

    async getPlanosTreinador(user) {
        let response

        await fetch(`${this.url}/plano/treinador/${user}`, {
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

    async getAtletasAssociadosPlano(id){
        let response

        await fetch(`${this.url}/plano/${id}/atletas`, {
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