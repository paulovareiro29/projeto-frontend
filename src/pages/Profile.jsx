import { React, useEffect, useState } from "react";

import Badge from "../components/Badge/Badge";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";


import Logo from "../images/profile.jpg"

import '../styles/pages/profile.css'

export default function Profile() {
    const [editing, setEditing] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [info, setInfo] = useState()

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
        if(!loaded){
            fetch("http://localhost/projeto-backend/user/2", { method: "GET", headers: { "content-type": "application/json" }, mode: 'cors' })
            .then(res => res.json())
            .then((result) => {
                console.log(result)
                setInfo(result)
                setLoaded(true)
            })
        }
    });
    



    const editButtonClick = () => {
        setEditing(!editing)
    }

    if(!loaded) return <h1>Loading</h1>

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
                        <Button onClick={editButtonClick} title="Edit profile" size={15} type={"secondary"} bold />
                    </div>
                </div>

            </div>

            <div className="profile-content">
                <Card title="Informação">
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
                                <td>{info.address}</td>
                            </tr>
                        </tbody>
                    </table>
                </Card>

            </div>
        </div>
    )
}