import { React } from "react";
import { Route } from "react-router-dom";
import Roles from "./admin/roles/Roles";

import '../styles/pages/administration.css'

export default function Administracao() {
    return (
        <>

            <div className="administration-header">
                <span>Area administrativa</span>
            </div>

            <div className="administration-body">
                <Route path="/app/admin/roles">
                    <Roles />
                </Route>
            </div>

        </>
    )
}