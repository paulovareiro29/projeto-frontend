import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../components/API";
import Loading from "../../components/Loading/Loading";

import './roles.css'

function Checkbox({ id, name, defaultChecked, props }) {

    const [checked, setChecked] = useState(defaultChecked)

    const toggle = () => {

        //change user role

        setChecked(!checked)
    }

    return (
        <>
            <label htmlFor={name + id}>{name}</label>
            <input type="checkbox" name={name} id={name + id} checked={checked} onChange={toggle} {...props} />
        </>
    )
}

export default function GiveRoles() {

    const [users, setUsers] = useState(null)

    useEffect(() => {
        async function fetchData() {
            const data = await API.getUsers()
            setUsers(data)
        }

        if (!users)
            fetchData()
    })

    if (!users) return <Loading />

    const List = Object.values(users).map((user, index) => (

        <div className="user-list-row" key={index}>
            <Link to={"/app/profile/" + user.id}>{user.username}</Link>
            <Checkbox name="atleta" id={user.id} defaultChecked={user.roles.atleta} />
            <Checkbox name="treinador" id={user.id} defaultChecked={user.roles.treinador} />
            <Checkbox name="admin" id={user.id} defaultChecked={user.roles.admin} />
        </div>
    ))

    return (
        <div className="roles">
            <div className="title">
                <h1>Administração</h1>
            </div>

            <div className="user-list">
                {List}
            </div>
        </div>

    )
}