import { React, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { UserContext } from "../Context";
import Form from "../Form/Form";
import Input from "../Form/Inputs/Input";

import './exercicio.css'

export default function Exercicio({ exercicio, refresh, ...rest }) {

    const [isShowing, setIsShowing] = useState(false)
    const [isDone, setIsDone] = useState(exercicio.realizado)
    const [isEditing, setEditing] = useState(false)

    if (refresh) refresh = refresh.bind(this)

    const toggleDone = async () => {
        await fetch(`http://localhost/projeto-backend/plano/blocoexercicio/${exercicio.bloco_id}/${exercicio.exercicio_id}`,
            {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    "realizado": !isDone
                }),
                mode: 'cors'
            })
            .then(res => res.json())
            .then((res) => {
                console.log(res)
            })

    }

    const deleteExercise = async () => {
        await fetch(`http://localhost/projeto-backend/plano/blocoexercicio/${exercicio.bloco_id}/${exercicio.exercicio_id}`,
            {
                method: "DELETE",
                headers: { "content-type": "application/json" },
                mode: 'cors'
            })
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                refresh()
            })
    }

    const saveExercise = async (data) => {
        await fetch(`http://localhost/projeto-backend/plano/blocoexercicio/${exercicio.bloco_id}/${exercicio.exercicio_id}`,
        {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                "carga": data.carga,
                "repeticoes": data.repeticoes,
                "series": data.series,
                "tempo_distancia": data.tempo_distancia
            }),
            mode: 'cors'
        })
        .then(res => res.json())
        .then((res) => {
            console.log(res)
            refresh()
        })
    }

    const body = () => {
        return (isEditing
            ? <>
                <Form onSubmit={saveExercise} submitBtnName="Guardar">
                    <label htmlFor="carga">Carga</label>
                    <Input defaultValue={exercicio.carga} placeholder="Carga" name="carga" id="carga" />
                    <label htmlFor="carga">Repetições</label>
                    <Input defaultValue={exercicio.repeticoes} placeholder="Repetições" name="repeticoes" id="repeticoes" />
                    <label htmlFor="carga">Series</label>
                    <Input defaultValue={exercicio.series} placeholder="Series" name="series" id="series" />
                    <label htmlFor="carga">Tempo/Distancia</label>
                    <Input defaultValue={exercicio.tempo_distancia} placeholder="Tempo/Distancia" name="tempo_distancia" id="tempo_distancia" />
                </Form>
            </>
            : <>
                <div className="exercicio-info">Carga <span>{exercicio.carga}</span></div>
                <div className="exercicio-info">Repetições<span> {exercicio.repeticoes}</span></div>
                <div className="exercicio-info">Series<span> {exercicio.series}</span></div>
                <div className="exercicio-info">Tempo/Distancia<span> {exercicio.tempo_distancia}</span></div>
                <div className="exercicio-info " >Realizado
                    <input type="checkbox" onClick={() => {
                        setIsDone(!isDone)
                    }} checked={isDone} onChange={() => { toggleDone() }} /></div>
            </>)
    }

    if (exercicio === null) return <></>
    return (
        <>
            <div className="exercicio-component">
                <div className={"exercicio-wrapper " + (isDone ? "done" : "")}>
                    <div className={"exercicio-header " + (isDone ? "done" : "")}>
                        <div className="exercicio-nome" onClick={() => {
                            setIsShowing(!isShowing)
                            console.log(exercicio)
                        }}>{exercicio.exercicio.nome}</div>
                        <div className="exercicio-descricao">{exercicio.exercicio.descricao}</div>
                    </div>
                    <div className={"exercicio-body " + (!isShowing ? "hidden" : "")}>
                        <UserContext.Consumer>
                            {user => {
                                if (user.roles.treinador || user.roles.admin) {
                                    return <>
                                        <div className="exercicio-options">
                                            <div className="exercicio-options-wrapper">
                                                <span className="exercicio-options-item" onClick={() => { setEditing(!isEditing) }}><AiFillEdit color="#f7e818" size="20" /></span>
                                                <span className="exercicio-options-item" onClick={deleteExercise}><AiFillDelete color="#d52f2f" size="20" /></span>
                                            </div>
                                        </div>
                                    </>
                                }
                            }}
                        </UserContext.Consumer>
                        {body()}

                    </div>
                </div>
            </div>
        </>
    )
}