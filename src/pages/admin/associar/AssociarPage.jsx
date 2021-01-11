import { React, useEffect, useState } from "react";
import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import API from "../../../components/API";
import Card from "../../../components/Card/Card";
import Form from "../../../components/Form/Form";
import SelectOption from "../../../components/Form/Inputs/Select/partials/SelectOption";
import Select from "../../../components/Form/Inputs/Select/Select";
import Loading from "../../../components/Loading/Loading";
import Modal from "../../../components/Modal/Modal";
import ModalHeader from "../../../components/Modal/partials/ModalHeader";

import "./associarpage.css";

function AssociarComponent({ treinador, atletas, refresh }) {
  const [modal, setModal] = useState(false);

  refresh = refresh.bind(this);

  const dissociate = async (id) => {
    await fetch(`${API.getURL()}/user/dissociate`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        treinador_id: treinador.id,
        atleta_id: id,
      }),
      mode: "cors",
    })
      .then((res) => res.json())
      .then((result) => {
        refresh();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const associate = async (data) => {
    await fetch(`${API.getURL()}/user/associate`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        treinador_id: treinador.id,
        atleta_id: data.atleta,
      }),
      mode: "cors",
    })
      .then((res) => res.json())
      .then((result) => {
        refresh();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const Lista = Object.values(treinador.atletas).map((atleta, index) => {
    return (
      <tr key={index}>
        <td>
          <div>
            <Link
              className="associar-component-link"
              to={"/app/profile/" + atleta.id}
            >
              {atleta.nome}
            </Link>
          </div>
        </td>
        <td>
          <div
            className="associar-component-dissassociate"
            onClick={() => {
              dissociate(atleta.id);
            }}
          >
            <AiOutlineUserDelete color="#FFFFFF" size={20} />
          </div>
        </td>
      </tr>
    );
  });
  return (
    <>
      <div className="associar-component-wrapper">
        <div className="associar-component-header">
          <Link
            className="associar-component-link"
            to={"/app/profile/" + treinador.id}
          >
            {treinador.nome}
          </Link>
          <span
            className="associar-component-associate"
            onClick={() => {
              setModal(true);
            }}
          >
            <AiOutlineUserAdd color="#FFFFFF" size={20} />
          </span>
        </div>
        <div className="associar-component-body">
          <div className="associar-component-atletas">
            <table>
              <thead></thead>
              <tbody>{Lista}</tbody>
            </table>
          </div>
        </div>
      </div>
      {modal ? (
        <Modal
          isShowing={modal}
          onRequestClose={() => {
            setModal(false);
          }}
        >
          <ModalHeader>Associar a {treinador.nome}</ModalHeader>
          <Form
            onSubmit={(data) => {
              associate(data);
              setModal(false)
            }}
          >
            <Select name="atleta" id="atleta">
              {Object.values(atletas).map((atleta, index) => {
                let exists = false;

                for (const [, value] of Object.entries(treinador.atletas)) {
                  if (value.id === atleta.id) exists = true;
                }

                if (exists) return null;

                return (
                  <SelectOption key={index} value={atleta.id}>
                    {atleta.nome}
                  </SelectOption>
                );
              })}
            </Select>
          </Form>
        </Modal>
      ) : null}
    </>
  );
}

export default function AssociarPage() {
  const [treinadores, setTreinadores] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [atletas, setAtletas] = useState(null);

  const refresh = () => {
    setRefreshKey(refreshKey + 1);
  };

  useEffect(() => {
    const fetchTreinadores = async () => {
      await fetch(`${API.getURL()}/user/`, {
        method: "GET",
        headers: { "content-type": "application/json" },
        mode: "cors",
      })
        .then((res) => res.json())
        .then((result) => {
          let treinadores = [];
          let atletas = [];
          result.forEach((user) => {
            if (user.roles.treinador) treinadores.push(user);
            if (user.roles.atleta) atletas.push(user);
          });
          setTreinadores(treinadores);
          setAtletas(atletas);
        });
    };
    fetchTreinadores();
  }, [refreshKey]);

  if (treinadores === null) return <Loading />;

  const Lista = treinadores.map((treinador, index) => {
    return (
      <div className="associar-component" key={index}>
        <AssociarComponent
          refresh={refresh}
          treinador={treinador}
          atletas={atletas}
        />
      </div>
    );
  });

  return (
    <>
      <div className="associar-page">
        <div className="associar-page-wrapper">
          <Card title={"Associar Treinador-Atleta"}>{Lista}</Card>
        </div>
      </div>
    </>
  );
}
