import { React, useState } from "react";

import './exercicio.css'

export default function Exercicio({ exercicio, ...rest }) {

    const [isShowing, setIsShowing] = useState(false)

    const body = () => {
        return <>
        <div className="exercicio-body">
            <div className="exercicio-info">Carga <span>{exercicio.carga}</span></div>
            <div className="exercicio-info">Repetições<span> {exercicio.repeticoes}</span></div>
            <div className="exercicio-info">Series<span> {exercicio.series}</span></div>
            <div className="exercicio-info">Tempo/Distancia<span> {exercicio.tempo_distancia}</span></div>
            <div className="exercicio-info">Realizado<span> {exercicio.realizado ? "Sim" : "Não"}</span></div>
        </div>
        </>
    }

    if (exercicio === null) return <></>
    return (
        <>
            <div className="exercicio-component">
                <div className="exercicio-wrapper">
                    <div className="exercicio-header">
                        <div className="exercicio-nome" onClick={() => {setIsShowing(!isShowing)
                             console.log(exercicio)}}>{exercicio.exercicio.nome}</div>
                        <div className="exercicio-descricao">{exercicio.exercicio.descricao}</div>
                    </div>
                    <div className="exercicio-options">
                        {exercicio.bloco_id} - {exercicio.exercicio_id}
                    </div>
                    {isShowing ? body() : ''}
                </div>
            </div>
        </>
    )
}