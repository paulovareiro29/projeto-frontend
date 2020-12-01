import { React, useEffect, useState } from "react";
import API from "../../../components/API";
import Loading from "../../../components/Loading/Loading";

import './exerciciospage.css'

export default function ExerciciosPage() {

    const [exercicios, setExercicios] = useState(null)

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

        return (
            <tr className="exercise-list-row" key={index}>
                <td className="exercise-list-row-title">
                    {exercise.nome}
                </td>

                <td>{exercise.descricao}</td>
                <td>{exercise.tipo.nome}</td>
            </tr>)
    })

    return (
        <div className="exercises">
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

    )
}