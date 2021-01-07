import { React, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import API from "../API";
import { UserContext } from "../Context";
import Exercicio from "../Exercicio/Exercicio";
import Form from "../Form/Form";
import Input from "../Form/Inputs/Input";
import SelectOption from "../Form/Inputs/Select/partials/SelectOption";
import Select from "../Form/Inputs/Select/Select";
import Modal from "../Modal/Modal";
import ModalHeader from "../Modal/partials/ModalHeader";


import './planotreino.css'



export default function PlanoTreino({ defaultPlano = null, children }) {

    let nDiasPrLinha = 7;

    const [isShowing, setIsShowing] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [plano, setPlano] = useState(defaultPlano)

    const [modal, setModal] = useState({ isShowing: false, dia: null })

    const [exercicios, setExercicios] = useState(null)

    useEffect(() => {
        async function fetchData() {
            const data = await API.getExercises()
            setExercicios(data)
        }


        if (!exercicios)
            fetchData()
    })

    const refresh = async () => {
        setIsRefreshing(true)
        await fetch(`http://localhost/projeto-backend/plano/${plano.id}`,
            {
                method: "GET",
                headers: { "content-type": "application/json" },
                mode: 'cors'
            })
            .then(res => res.json())
            .then((res) => {
                setPlano(res)
            })
        setIsRefreshing(false)
    }

    const addExercise = async (data) => {
        console.log(data)

        await fetch(`http://localhost/projeto-backend/plano/${plano.id}/add`,
            {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    "dia": modal.dia,
                    "exercicio_id": data.exercicio,
                    "series": data.series,
                    "repeticoes": data.repeticoes,
                    "carga": data.carga,
                    "tempo_distancia": data.tempo_distancia
                }),
                mode: 'cors'
            })
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                setModal({ isShowing: false, dia: null })
                refresh()
            })


    }

    const arrayBlocos = () => {
        let e = [] //array de exercicios
        plano.blocos.map((bloco, index) => {
            return e.push(<td key={index}>
                <div className="bloco-dia">
                    <span>Dia {index + 1} </span>
                    <UserContext.Consumer>
                        {user => (
                            user.roles.treinador || user.roles.admin ? <FaPlus className="addExerciseBtn" color="#4eec2f" onClick={() => { setModal({ isShowing: true, dia: index }) }} /> : ''
                        )}
                    </UserContext.Consumer>
                </div>
                <div className="bloco">
                    {bloco.map((exercicio, key) => {
                        return <Exercicio key={key} refresh={refresh} exercicio={exercicio} />
                    })}
                </div>
            </td>
            )
        })
        e = twoDimensional(e, nDiasPrLinha) //passa um array unidimensional para bidimensional
        return e
    }

    const calendarioTreino = () => {
        let calendario = []
        let linhas = Math.ceil(plano.dias / nDiasPrLinha) //quantas linhas vai existir no plano, dias/7
        let blocos = arrayBlocos()

        for (let i = 0; i < linhas; i++) {
            calendario.push(
                <tr key={i}>
                    {blocos[i]}
                </tr>
            )
        }

        return calendario;
    }

    if (plano === null || exercicios === null || isRefreshing) return <></>



    return (<>
        <div className="plano-component">
            <div className="plano-wrapper">
                <div className="plano-header">
                    <div className="plano-header-top">
                        <div className="plano-nome" onClick={() => {
                            setIsShowing(!isShowing)
                        }}>{plano.nome}</div>
                        <div className="plano-data">{plano.data_inicial} - {plano.data_final}</div>
                    </div>
                    <div className="plano-header-bottom">
                        <span>{plano.descricao}</span>
                    </div>
                </div>
                {(isShowing ? <div className="plano-body">
                    <table>
                        <thead>
                        </thead>
                        <tbody>
                            {calendarioTreino()}
                        </tbody>
                    </table>
                </div> : '')}
                <div className="plano-footer">
                    {children}
                </div>
            </div>
        </div>
        {modal.isShowing ? <Modal
            isShowing={modal.isShowing}
            onRequestClose={() => { setModal({ isShowing: false, dia: null }) }}
        >
            <ModalHeader>Criar exercicio dia: {modal.dia + 1}</ModalHeader>



            <Form onSubmit={addExercise} submitBtnName="Guardar">
                <label htmlFor="exercicio">Exercicio</label>
                <Select name="exercicio" id="exercicio">
                    {Object.values(exercicios).map((exercicio, index) => {

                        let exists = false

                        for (const [key, value] of Object.entries(plano.blocos[modal.dia])) {
                            if (value.exercicio_id === exercicio.id)
                                exists = true

                        }

                        if (exists)
                            return null

                        return <SelectOption key={index} value={exercicio.id}>{exercicio.nome}</SelectOption>
                    })}
                </Select>

                <label htmlFor="carga">Carga</label>
                <Input placeholder="Carga" name="carga" id="carga" type="number" />

                <label htmlFor="carga">Repetições</label>
                <Input placeholder="Repetições" name="repeticoes" id="repeticoes" type="number" />

                <label htmlFor="carga">Series</label>
                <Input placeholder="Series" name="series" id="series" type="number" />

                <label htmlFor="carga">Tempo/Distancia</label>
                <Input placeholder="Tempo/Distancia" name="tempo_distancia" id="tempo_distancia" />
            </Form>

        </Modal> : ''}
    </>
    )
}


function twoDimensional(arr, size) {
    var res = [];
    for (var i = 0; i < arr.length; i = i + size)
        res.push(arr.slice(i, i + size));
    return res;
}