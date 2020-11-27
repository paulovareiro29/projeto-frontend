import { React, useEffect, useState } from "react";


import { AiFillHome } from "react-icons/ai";
import { CgProfile, CgGym } from "react-icons/cg";
import { RiAdminFill } from "react-icons/ri";
import { TiArrowRepeatOutline } from "react-icons/ti";

import LogoutButton from "./partials/LogoutButton";
import SidebarItem from "./partials/SidebarItem";
import SidebarSubItem from "./partials/SidebarSubItem";

import './styles/sidebar.css'
import SidebarMenu from "./partials/SidebarMenu";
import Auth from "../Auth";
import API from "../API";
import Loading from "../Loading/Loading";

export default function Sidebar() {

    const [user, setUser] = useState(null)

    useEffect(() => {
        async function fetchUser() {
            setUser(await API.getUserByToken(Auth.getToken()))
        }

        if (!user)
            fetchUser()
    }, [user])

    if (!user) return (<Loading />)

    return (
        <div id="sidebar">
            <div className="sidebar-header">
                <span>Fitness Club</span>
            </div>
            <div className="sidebar-content">
                <SidebarMenu>
                    <SidebarItem icon={AiFillHome} title="Home" to="/app" />
                    <SidebarItem icon={CgProfile} title="Perfil" to={"/app/profile/" + user.id} />
                </SidebarMenu>

                <SidebarMenu title="Area Principal">
                    <SidebarItem icon={CgGym} title="Treino" permission={Auth.isAny()}>
                        {/* PARA ATLETAS */}
                        <SidebarSubItem title="Planos de treino" permission={Auth.isAtleta()} />

                        {/* PARA TREINADORES */}
                        <SidebarSubItem title="Exercicios" permission={Auth.isTreinador()} />


                    </SidebarItem>
                    <SidebarItem icon={TiArrowRepeatOutline} title="Relações" permission={Auth.isAny()}>
                        {/* PARA ATLETAS */}
                        <SidebarSubItem title="Treinadores" permission={Auth.isAtleta()} />

                        {/* PARA TREINADORES */}
                        <SidebarSubItem title="Atletas" permission={Auth.isTreinador()} />
                    </SidebarItem>
                </SidebarMenu>

                <SidebarMenu title="Administração" permission={Auth.isAdmin()}>
                    <SidebarItem icon={RiAdminFill} title="Administração" permission={Auth.isAdmin()}>
                        <SidebarSubItem title="Atribuir roles" to="/app/admin/roles" permission={Auth.isAdmin()} />
                    </SidebarItem>
                </SidebarMenu>

            </div>
            <div className="sidebar-footer">
                <span>Paulo Vareiro</span>
                <LogoutButton />
            </div>
        </div>
    );
}
