import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API from "../../../../components/API";
import Loading from "../../../../components/Loading/Loading";
import Card from "../../../../components/Card/Card";

import { HiUserAdd, HiUserRemove } from 'react-icons/hi'

import './roles.css'


function Checkbox({ id, name, defaultChecked, props }) {

    const [checked, setChecked] = useState(defaultChecked)


    const toggle = async () => {

        const data = await API.getUser(id)
        const roles = {
            admin: data.roles.admin,
            atleta: data.roles.atleta,
            treinador: data.roles.treinador
        }

        roles[name] = !checked

        console.log(roles)
        //change user role
        await fetch(`http://localhost/projeto-backend/user/${id}`,
            {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    "admin": roles.admin,
                    "atleta": roles.atleta,
                    "treinador": roles.treinador
                }),
                mode: 'cors'
            })
            .then(res => res.json())
            .then((res) => {
                console.log(res)
            })

        setChecked(!checked)
    }

    return (
        <div onClick={toggle} className={"checkbox " + (checked ? 'checked' : '')}>
            {(checked ? <HiUserRemove /> : <HiUserAdd />)}
        </div>
    )
}

export default function Roles() {

    const [searchValue, setSearchValue] = useState('')
    const [users, setUsers] = useState(null)

    useEffect(() => {
        async function fetchData() {
            const data = await API.getUsers()
            setUsers(data)
        }


        fetchData()
    }, [])

    if (!users) return <Loading />

    const List = Object.values(users).map((user, index) => {

        if (!user.username.toString().toLowerCase().includes(searchValue))
            return null

        return (
            <tr className="user-list-row" key={index}>
                <td className="user-list-row-title">
                    <Link to={"/app/profile/" + user.id} >{user.username}</Link>
                </td>

                <td><Checkbox name="atleta" id={user.id} defaultChecked={user.roles.atleta} /></td>
                <td><Checkbox name="treinador" id={user.id} defaultChecked={user.roles.treinador} /></td>
                <td><Checkbox name="admin" id={user.id} defaultChecked={user.roles.admin} /></td>
            </tr>)
    })

    return (
        <Card title="Permissões" className="roles">


            <input className="roles-search-btn" type="text" name="search" placeholder="Procurar utilizador" value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} />
            <div className="user-list">
                <table>
                    <thead>
                        <tr>
                            <th>Utilizador</th>
                            <th>Atleta</th>
                            <th>Treinador</th>
                            <th>Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {List}
                    </tbody>

                </table>

            </div>
        </Card>

    )
}