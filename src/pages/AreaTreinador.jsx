import { React } from "react";
import { Route } from "react-router-dom";

import '../styles/pages/areatreinador.css'
import ExerciciosPage from "./treinador/exercicios/ExerciciosPage";

export default function AreaTreinador(){

    return (
        <>
            <div className="areatreinador-header">
                <span>Area do treinador</span>
            </div>

            <div className="areatreinador-body">
                <Route path="/app/treinador/exercicios">
                    <ExerciciosPage />
                </Route>
            </div>

        </>
    )
}