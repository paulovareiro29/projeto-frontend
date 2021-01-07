import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../components/API";

import Badge from "../components/Badge/Badge";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import Form from "../components/Form/Form";
import Input from "../components/Form/Inputs/Input";
import Loading from "../components/Loading/Loading";


import Logo from "../images/profile.jpg"



import '../styles/pages/profile.css'

export default function Profile() {
    let {id} = useParams()

    const [editing, setEditing] = useState(false)
    const [info, setInfo] = useState(undefined)

    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        async function fetchData(){
            const data = await API.getUser(id)

            setInfo(data)
            if(refresh === true) 
                setRefresh(false)
        }

        if (info === undefined || refresh === true) {
            fetchData()
        }
    });

    const editButtonClick = () => {
        setEditing(true)
    }

    const saveEdit = async (e) => {
        console.log(e.nome)

        //atribuir ID
        await fetch(`http://localhost/projeto-backend/user/${id}`,
            {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    //"username": info.username,
                    //"pass": info.password,
                    "nome": e.nome,
                    "morada": e.morada,
                    "email": e.email,
                    "admin": info.roles.admin,
                    "atleta": info.roles.atleta,
                    "treinador": info.roles.treinador
                }),
                mode: 'cors'
            })
            .then(res => res.json())
            .then((res) => {
                console.log(res)
            })

        setRefresh(true)
        setEditing(false)
    }
    
    if (info === undefined || refresh) 
        return <Loading />

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
                            <Form onSubmit={saveEdit} submitBtnName="Guardar">
                                <label htmlFor="nome">Nome</label>
                                <Input defaultValue={info.nome} placeholder="Nome" name="nome" id="nome"/>

                                <label htmlFor="email">Email</label>
                                <Input defaultValue={info.email} placeholder="Email" name="email" id="email"/>

                                <label htmlFor="morada">Morada</label>
                                <Input defaultValue={info.morada} placeholder="Morada" name="morada" id="morada"/>
                            </Form>
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