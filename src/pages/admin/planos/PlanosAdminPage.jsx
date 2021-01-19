import { React, useEffect, useState } from "react";
import { BiRefresh } from "react-icons/bi";
import API from "../../../components/API";
import Badge from "../../../components/Badge/Badge";
import CreatePlanoForm from "../../../components/CreatePlanoForm/CreatePlanoForm";
import Loading from "../../../components/Loading/Loading";
import Modal from "../../../components/Modal/Modal";
import ModalHeader from "../../../components/Modal/partials/ModalHeader";
import PlanoTreino from "../../../components/PlanoTreino/PlanoTreino";

import "./planosadminpage.css";

export default function PlanosAdminPage({ user }) {
  const [planos, setPlanos] = useState(null);
  const [exerciciosDisponiveis, setExerciciosDisponivel] = useState(null);

  const [modalAddPlano, setModalAddPlano] = useState(false);

  const createPlano = async (plano) => {
    await fetch(`${API.getURL()}/plano/`, {
      method: "POST",
      headers: { "content-type": "application/json", token: Auth.getToken()  },
      body: JSON.stringify({
        treinador_id: plano.treinador.id,
        nome: plano.nome,
        descricao: plano.descricao,
        data_inicial: plano.data_inicial,
        data_final: plano.data_final,
      }),
      mode: "cors",
    })
      .then((res) => res.json())
      .then((res) => {
        setPlanos(null);
        setModalAddPlano(false);
      });
  };

  useEffect(() => {
    async function fetchExercicios() {
      const data = await API.getExercises();
      setExerciciosDisponivel(data);
    }

    if (!exerciciosDisponiveis) fetchExercicios();

    async function fetchPlanos() {
      setPlanos(await API.getPlanos());
    }

    if (!planos && exerciciosDisponiveis) fetchPlanos();
  }, [planos, exerciciosDisponiveis]);

  if (planos === null || exerciciosDisponiveis === null) {
    return <Loading />;
  }

  const ListaPlanos = () => {
    return Object.values(planos).map((plano, index) => {
      return (
        <PlanoTreino
          defaultPlano={plano}
          exercicios={exerciciosDisponiveis}
          key={index}
          footer
          admin
        />
      );
    });
  };

  return (
    <>
      <div className="planos-admin">
        <div className="planos-admin-header">
          <span
            className="planos-admin-btn"
            onClick={() => {
              setModalAddPlano(true);
            }}
          >
            <Badge>Adicionar plano</Badge>
          </span>
          <span
            className="planos-admin-btn"
            onClick={() => {
              setPlanos(null);
            }}
          >
            <Badge>
              Refresh
              <BiRefresh size={20} />
            </Badge>
          </span>
        </div>
        {ListaPlanos()}
      </div>
      {modalAddPlano ? (
        <Modal
          isShowing={modalAddPlano}
          onRequestClose={() => {
            setModalAddPlano(false);
          }}
        >
          <ModalHeader>Criar plano</ModalHeader>

          <CreatePlanoForm
            callback={(data) => {
              createPlano(data)
            }}
            admin
          />
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}
