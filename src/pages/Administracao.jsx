import { React } from "react";
import { Route } from "react-router-dom";

import '../styles/pages/administration.css'
import AssociarPage from "./admin/associar/AssociarPage";
import ContasPage from "./admin/contas/ContasPage";

export default function Administracao() {
    return (
        <>

            <div className="administration-header">
                <span>Area administrativa</span>
            </div>

            <div className="administration-body">
                <Route path="/app/admin/contas">
                    <ContasPage />
                </Route>
                <Route path="/app/admin/associar">
                    <AssociarPage />
                </Route>
            </div>

        </>
    )
}