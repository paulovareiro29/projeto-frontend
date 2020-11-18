import { React, useEffect, useState } from "react";

import Badge from "../components/Badge/Badge";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import TextField from "../components/Inputs/TextField";


import Logo from "../images/profile.jpg"

import '../styles/pages/profile.css'

export default function Profile() {
    const [editing, setEditing] = useState(false)
    const [info, setInfo] = useState(undefined)
    const [loaded, setLoaded] = useState(false)

    /*const info = {
        name: 'Paulo Vareiro',
        email: 'paulovareiro29@gmail.com',
        address: 'Rua 31 de janeiro 193 1º andar',
        roles: {
            atleta: true,
            treinador: true,
            admin: true
        }
    }*/

    //make this only do once
    useEffect(() => {
        if (!loaded) {
            fetch("http://localhost/projeto-backend/user/1", { method: "GET", headers: { "content-type": "application/json" }, mode: 'cors' })
                .then(res => res.json())
                .then((result) => {
                    if (info === undefined)
                        setInfo(result)
                    setLoaded(true)
                })
        }
    });




    const editButtonClick = () => {
        setEditing(true)
    }

    const saveEdit = (e) => {
        e.preventDefault()
        
        console.log(e.target.nome.value)
        console.log(e.target.email.value)
        console.log(e.target.morada.value)

        fetch("http://localhost/projeto-backend/user/1",
            {
                method: "PUT",
                headers: { "content-type": "text/json" },
                body: {
                    "username": info.username,
                    "pass": info.password,
                    "nome": e.target.nome.value,
                    "morada": e.target.morada.value,
                    "email": e.target.email.value,
                    "admin": info.roles.admin,
                    "atleta": info.roles.atleta,
                    "treinador": info.roles.treinador
                },
                mode: 'cors'
            })
            .then(res => res.text())
            .then((result) => {
                console.log(result)
            })
            setLoaded(false)
            setEditing(false)
    }

    if (info === undefined) return <h1>Loading</h1>

    return (
        <div id="profile">
            <div className="profile-header">
                <div className="profile-background-wrapper">
                    <div className="profile-background">

                    </div>
                </div>
                <div className="profile-info-wrapper">
                    <div className="profile-photo">
                        <img src={Logo} alt="" />
                    </div>

                    <div className="profile-info">
                        <div className="profile-info-name">
                            {info.nome}
                        </div>
                        <div className="profile-info-email">
                            {info.email}
                        </div>
                        <div className="profile-info-roles">
                            {info.roles.admin ? <Badge>Administrador</Badge> : null}
                            {info.roles.treinador ? <Badge>Treinador</Badge> : null}
                            {info.roles.atleta ? <Badge>Atleta</Badge> : null}
                        </div>
                    </div>


                    <div className="profile-edit-info">
                        {!editing
                            ? <Button onClick={editButtonClick} title="Edit profile" size={15} styleType={"secondary"} bold />
                            : null}
                    </div>
                </div>

            </div>

            <div className="profile-content">
                {
                    editing
                        ? <Card title={<>Informação</>} >
                            <form onSubmit={saveEdit}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Nome</th>
                                            <td><TextField value={info.nome} placeholder="Nome" name="nome" /></td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td><TextField value={info.email} placeholder="Email" name="email" /></td>
                                        </tr>
                                        <tr>
                                            <th>Morada</th>
                                            <td><TextField value={info.morada} placeholder="Morada" name="morada" /></td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <td><Button onSubmit={saveEdit} type="submit" title="Guardar" size={15} styleType={"secondary"} bold /></td>
                                        </tr>
                                    </tbody>
                                </table>

                            </form>
                        </Card>


                        : <Card title={"Informação"}>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Nome</th>
                                        <td>{info.nome}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{info.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Morada</th>
                                        <td>{info.morada}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Card>
                }


            </div>
        </div>
    )
}