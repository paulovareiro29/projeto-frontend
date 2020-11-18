import { React } from "react";
import { Link } from "react-router-dom";

import { BiLogOut } from "react-icons/bi";

import Auth from "../../Auth";

export default function LogoutButton() {
    return (
        <Link to="/" className="sidebar-logout link" onClick={() => {Auth.logout();}}>
            <BiLogOut /> Log Out
        </Link>
    )
}