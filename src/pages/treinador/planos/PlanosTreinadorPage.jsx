import { React, useEffect, useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import API from "../../../components/API";
import Auth from "../../../components/Auth";
import Form from "../../../components/Form/Form";
import SelectOption from "../../../components/Form/Inputs/Select/partials/SelectOption";
import Select from "../../../components/Form/Inputs/Select/Select";
import Loading from "../../../components/Loading/Loading";
import Modal from "../../../components/Modal/Modal";
import ModalHeader from "../../../components/Modal/partials/ModalHeader";
import PlanoTreino from "../../../components/PlanoTreino/PlanoTreino";
import './planostreinadorpage.css'

export default function PlanosTreinadorPage() {

    const [user, setUser] = useState(null)
    const [planos, setPlanos] = useState(null)

    const [modal, setModal] = useState({ isShowing: false, plano: null })

    useEffect(() => {
        async function fetchUser() {
            setUser(await API.getUserByToken(await Auth.getToken()))
        }

        async function fetchPlanos() {
            setPlanos(await API.getPlanosTreinador(user.id))
        }

        if (!user)
            fetchUser()

        if (!planos && user)
            fetchPlanos()

    }, [user, planos])

    if (!user || !planos) { return <Loading /> }

    const addAtleta = async (data) => {
        await fetch(`http://localhost/projeto-backend/plano/associate`,
        {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                "plano_id": modal.plano.id,
                "atleta_id": data.atleta
            }),
            mode: 'cors'
        })
        .then(res => res.json())
        .then((res) => {
            console.log(res)
            setModal({ isShowing: false, plano: null })
            setPlanos(null)
        })
    }

    const ListaPlanos = () => {
        return Object.values(planos).map((plano, index) => {
            return <PlanoTreino defaultPlano={plano} key={index}>
                <div className="plano-body">
                    Atletas 
                    {Object.values(plano.atletas_associados).map((atleta, key) => {
                    return <Link to={`/app/profile/${atleta.id}`} key={key} className="plano-atleta">{atleta.nome}</Link>
                })}<span className="addAtletaBtn"><BsPlusCircleFill onClick={() => { setModal({ isShowing: true, plano: plano }) }} /></span>
                </div>
            </PlanoTreino>


        })
    }

    return (
        <>
            <div className="planos-treinador">
                {ListaPlanos()}
            </div>
            {modal.isShowing ? <Modal
                isShowing={modal.isShowing}
                onRequestClose={() => { setModal({ isShowing: false, plano: null }) }}
            >
                <ModalHeader>Associar atleta</ModalHeader>

                <Form onSubmit={addAtleta} submitBtnName="Associar">
                    <label htmlFor="atleta">Atleta</label>

                    <Select name="atleta" id="atleta">
                        {Object.values(user.atletas).map((atleta, index) => {
                            console.log(modal.plano.atletas_associados)

                            let exists = false
                            console.log(atleta)
                            for (const [key, value] of Object.entries(modal.plano.atletas_associados)) {
                                
                                if (value.id === atleta.id)
                                    exists = true

                            }

                            if (exists)
                                return null

                            return <SelectOption key={index} value={atleta.id}>{atleta.nome}</SelectOption>
                        })}
                    </Select>
                </Form>

            </Modal> : ''}
        </>
    )
}