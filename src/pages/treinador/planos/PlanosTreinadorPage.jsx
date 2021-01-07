import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../../components/API";
import Auth from "../../../components/Auth";
import Loading from "../../../components/Loading/Loading";
import Modal from "../../../components/Modal/Modal";
import ModalHeader from "../../../components/Modal/partials/ModalHeader";
import PlanoTreino from "../../../components/PlanoTreino/PlanoTreino";
import './planostreinadorpage.css'

export default function PlanosTreinadorPage() {

    const [user, setUser] = useState(null)
    const [planos, setPlanos] = useState(null)

    const [modalIsShowing, setModalIsShowing] = useState(false)
    const [currentPlano, setCurrentPlano] = useState(null)

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

    const ListaPlanos = () => {
        return Object.values(planos).map((plano, index) => {
            return <div className="plano" key={index} >
                <div className="plano-header">
                    <div className="plano-header-top">
                        <div className="plano-nome" onClick={() => {
                            setCurrentPlano(plano)
                            setModalIsShowing(true)
                        }}>{plano.nome}</div>
                        <div className="plano-data">{plano.data_inicial} - {plano.data_final}</div>
                    </div>
                    <div className="plano-header-bottom">
                        <span>{plano.descricao}</span>
                    </div>

                </div>
                <div className="plano-body">
                    <span>Atletas: </span>
                    {Object.values(plano.atletas_associados).map((atleta, index) => {
                        return <Link to={`/app/profile/${atleta.id}`} key={index} className="plano-atleta">{atleta.username}</Link>
                    })}
                </div>
            </div>

        })
    }

    return (
        <>
            <div className="planos-treinador">
                {ListaPlanos()}
            </div>


            {(currentPlano !== null ? <Modal
                isShowing={modalIsShowing}
                onRequestClose={() => { setModalIsShowing(false) }}
            >
                <ModalHeader>{currentPlano.nome}</ModalHeader>
                <PlanoTreino plano={currentPlano} editPermission/>

            </Modal>: "")}

        </>
    )
}