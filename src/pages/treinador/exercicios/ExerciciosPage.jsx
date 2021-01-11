import { React, useEffect, useState } from "react";
import API from "../../../components/API";
import Card from "../../../components/Card/Card";
import Loading from "../../../components/Loading/Loading";
import Modal from "../../../components/Modal/Modal";
import ModalHeader from "../../../components/Modal/partials/ModalHeader";
import Popup from "../../../components/Popup/Popup";

import AddExerciseForm from "../../../components/AddExerciseForm/AddExerciseForm"
import { BsPlusCircleFill } from "react-icons/bs";

import './exerciciospage.css'


function TipoExercicio({ tipo }) {

    const [show, setShow] = useState(false)

    const handleClick = () => {
        setShow(!show)
    }

    return (
        <div className={"popup-trigger"}>
            <div onClick={handleClick} >
                {tipo.nome}
            </div>
            <Popup onClick={handleClick} show={show}>
                <div className="title">
                    <span>{tipo.nome}</span>
                </div>
                <span>{tipo.descricao}</span>
            </Popup>
        </div>

    )
}



export default function ExerciciosPage() {

    const [searchValue, setSearchValue] = useState('')
    const [exercicios, setExercicios] = useState(null)

    const [modalIsShowing, setModalIsShowing] = useState(false)


    const refresh = async () => {
        setExercicios(null)
        const data = await API.getExercises()
        setExercicios(data)
    }


    useEffect(() => {
        async function fetchData() {
            const data = await API.getExercises()
            console.log(data)
            setExercicios(data)
        }


        if (!exercicios)
            fetchData()
    })

    if (!exercicios) return <Loading />

    const List = Object.values(exercicios).map((exercise, index) => {

        if (!exercise.nome.toString().toLowerCase().includes(searchValue))
            return null

        return (
            <tr className="exercise-list-row" key={index}>
                <td className="exercise-list-row-title">
                    {exercise.nome}
                </td>

                <td>{exercise.descricao}</td>
                <td>
                    <TipoExercicio tipo={exercise.tipo} />
                </td>
            </tr>)
    })

    return (
        <>
            <Card title={
                <div className="card-exercicios">
                    <span className="card-exercicios-title">Exercicios</span>
                    <span className="card-exercicios-btn"><BsPlusCircleFill onClick={() => { setModalIsShowing(true) }} /></span>
                </div>}>
                <div className="exercises" >

                    <input className="exercises-search-btn" type="text" name="search" placeholder="Procurar exercicio" value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} />
                    <div className="exercise-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Exercicio</th>
                                    <th>Descrição</th>
                                    <th>Tipo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {List}
                            </tbody>

                        </table>

                    </div>
                </div>
            </Card>

            <Modal
                isShowing={modalIsShowing}
                onRequestClose={() => { setModalIsShowing(false) }}
            >
                <ModalHeader>Criar exercicio</ModalHeader>

                <AddExerciseForm onSuccess={() => {
                    setModalIsShowing(false)
                    refresh()}}/>
            </Modal>
        </>
    )
}