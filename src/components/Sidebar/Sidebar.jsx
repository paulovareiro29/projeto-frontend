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
            setUser(await API.getUserByToken(await Auth.getToken()))
        }

        if (!user)
            fetchUser()
    }, [user])



    return (
        <div id="sidebar">
            <div className="sidebar-header">
                <span>Fitness Club</span>
            </div>
            <div className="sidebar-content">
                {user ? <> {/*verificação para ver se o utilizador já está carregado*/}
                    <SidebarMenu>
                        <SidebarItem icon={AiFillHome} title="Home" to="/app" />
                        <SidebarItem icon={CgProfile} title="Perfil" to={"/app/profile/" + user.id} />
                    </SidebarMenu>

                    <SidebarMenu title="Area Principal">
                        <SidebarItem icon={CgGym} title="Treino" permission={(user.roles.atleta || user.roles.treinador)}>
                            {/* PARA ATLETAS */}
                            <SidebarSubItem title="Planos de treino atleta" permission={user.roles.atleta} />

                            {/* PARA TREINADORES */}
                            <SidebarSubItem title="Exercicios" to="/app/treinador/exercicios" permission={user.roles.treinador} />
                            <SidebarSubItem title="Planos de treino treinador" to="/app/treinador/planos" permission={user.roles.treinador} />


                        </SidebarItem>
                        <SidebarItem icon={TiArrowRepeatOutline} title="Relações" permission={(user.roles.atleta || user.roles.treinador)}>
                            {/* PARA ATLETAS */}
                            <SidebarSubItem title="Treinadores" permission={user.roles.atleta} />

                            {/* PARA TREINADORES */}
                            <SidebarSubItem title="Atletas" permission={user.roles.treinador} />
                        </SidebarItem>
                    </SidebarMenu>

                    <SidebarMenu title="Administração" permission={user.roles.admin}>
                        <SidebarItem icon={RiAdminFill} title="Administração" permission={user.roles.admin}>
                            <SidebarSubItem title="Permissões" to="/app/admin/roles" permission={user.roles.admin} />
                        </SidebarItem>
                    </SidebarMenu></>
                    : (<Loading />)}

            </div>
            <div className="sidebar-footer">
                <span>Paulo Vareiro</span>
                <LogoutButton />
            </div>
        </div>
    );
}
