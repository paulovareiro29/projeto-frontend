import  React from "react";


import { AiFillHome } from "react-icons/ai";
import { CgProfile, CgGym } from "react-icons/cg";
import { RiAdminFill } from "react-icons/ri";
import { TiArrowRepeatOutline } from "react-icons/ti";

import LogoutButton from "./partials/LogoutButton";
import SidebarItem from "./partials/SidebarItem";
import SidebarSubItem from "./partials/SidebarSubItem";

import './styles/sidebar.css'
import SidebarMenu from "./partials/SidebarMenu";
import { UserContext } from "../Context";

export default function Sidebar() {

    return (
        <div id="sidebar">
            <div className="sidebar-header">
                <span>Fitness Club</span>
            </div>
            <div className="sidebar-content">
                <UserContext.Consumer>
                    {user => (
                        <>
                            <SidebarMenu>
                                <SidebarItem icon={AiFillHome} title="Home" to="/app" />
                                <SidebarItem icon={CgProfile} title="Perfil" to={"/app/profile/" + user.id} />
                            </SidebarMenu>

                            <SidebarMenu title="Area Principal" permission={(user.roles.atleta || user.roles.treinador || user.roles.admin)}>
                                <SidebarItem icon={CgGym} title="Treino" permission={(user.roles.atleta || user.roles.treinador || user.roles.admin)}>
                                    {/* PARA ATLETAS */}
                                    <SidebarSubItem title="Planos de treino"  to="/app/planos" permission={user.roles.atleta || user.roles.treinador || user.roles.admin} />

                                    {/* PARA TREINADORES */}
                                    {/*<SidebarSubItem title="Planos de treino treinador" to="/app/treinador/planos" permission={user.roles.treinador} />*/}
                                    <SidebarSubItem title="Exercicios" to="/app/treinador/exercicios" permission={user.roles.treinador} />

                                </SidebarItem>
                                {true ? null : (<SidebarItem icon={TiArrowRepeatOutline} title="Relações" permission={(user.roles.atleta || user.roles.treinador)}>
                                    {/* PARA ATLETAS */}
                                    <SidebarSubItem title="Treinadores" permission={user.roles.atleta} />

                                    {/* PARA TREINADORES */}
                                    <SidebarSubItem title="Atletas" permission={user.roles.treinador} />
                                </SidebarItem>)}
                            </SidebarMenu>

                            <SidebarMenu title="Administração" permission={user.roles.admin}>
                                <SidebarItem icon={RiAdminFill} title="Administração" permission={user.roles.admin}>
                                    <SidebarSubItem title="Contas" to="/app/admin/contas" permission={user.roles.admin} />
                                    <SidebarSubItem title="Associar" to="/app/admin/associar" permission={user.roles.admin} />
                                </SidebarItem>
                            </SidebarMenu></>
                    )}
                </UserContext.Consumer>

            </div>
            <div className="sidebar-footer">
                <span>Paulo Vareiro</span>
                <LogoutButton />
            </div>
        </div>
    );
}
