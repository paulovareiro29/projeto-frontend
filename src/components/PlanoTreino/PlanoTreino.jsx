import { React, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import API from "../API";
import Badge from "../Badge/Badge";
import { UserContext } from "../Context";
import Exercicio from "../Exercicio/Exercicio";
import Form from "../Form/Form";
import Input from "../Form/Inputs/Input";
import SelectOption from "../Form/Inputs/Select/partials/SelectOption";
import Select from "../Form/Inputs/Select/Select";
import Modal from "../Modal/Modal";
import ModalHeader from "../Modal/partials/ModalHeader";
import CreatePlanoForm from "../CreatePlanoForm/CreatePlanoForm";

import "./planotreino.css";
import { AiFillEdit, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import EditPlanoForm from "../EditPlanoForm/EditPlanoForm";
import Auth from "../Auth";

export default function PlanoTreino({
  defaultPlano = null,
  exercicios,
  footer,
  admin,
}) {
  let nDiasPrLinha = 7;

  const [isShowing, setIsShowing] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [plano, setPlano] = useState(defaultPlano);

  const [modal, setModal] = useState({ isShowing: false, dia: null });
  const [modalCopy, setModalCopy] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const [treinador, setTreinador] = useState(null);

  const [modalAddAtleta, setModalAddAtleta] = useState({
    isShowing: false,
    plano: null,
  });
  const [modalDeleteAtleta, setModalDeleteAtleta] = useState({
    isShowing: false,
    plano: null,
  });

  const getTreinador = async () => {
    await fetch(`${API.getURL()}/user/${plano.treinador.id}`, {
      method: "GET",
      headers: { "content-type": "application/json", token: Auth.getToken()  },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setTreinador(res);
      });
  };

  const addAtleta = async (data) => {
    await fetch(`${API.getURL()}/plano/associate`, {
      method: "POST",
      headers: { "content-type": "application/json", token: Auth.getToken()  },
      body: JSON.stringify({
        plano_id: modalAddAtleta.plano.id,
        atleta_id: data.atleta,
      }),
      mode: "cors",
    })
      .then((res) => res.json())
      .then((res) => {
        setModalAddAtleta({ isShowing: false, plano: null });
        refresh();
      });
  };

  const deleteAtleta = async (data) => {
    await fetch(`${API.getURL()}/plano/dissociate`, {
      method: "POST",
      headers: { "content-type": "application/json", token: Auth.getToken()  },
      body: JSON.stringify({
        plano_id: modalDeleteAtleta.plano.id,
        atleta_id: data.atleta,
      }),
      mode: "cors",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setModalDeleteAtleta({ isShowing: false, plano: null });
        refresh();
      });
  };

  const refresh = async () => {
    setIsRefreshing(true);
    await fetch(`${API.getURL()}/plano/${plano.id}`, {
      method: "GET",
      headers: { "content-type": "application/json", token: Auth.getToken()  },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((res) => {
        setPlano(res);
      });
    setIsRefreshing(false);
  };

  const duplicate = async (data, treinador_id) => {
    await fetch(`${API.getURL()}/plano/duplicate`, {
      method: "POST",
      headers: { "content-type": "application/json", token: Auth.getToken()  },
      body: JSON.stringify({
        id: plano.id,
        treinador_id: treinador_id,
        nome: data.nome,
        descricao: data.descricao,
        data_inicial: data.data_inicial,
        data_final: data.data_final,
      }),
      mode: "cors",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setModalCopy(false);
        refresh();
      });
  };

  const editPlano = async (data) => {
    await fetch(`${API.getURL()}/plano/${plano.id}`, {
      method: "PUT",
      headers: { "content-type": "application/json", token: Auth.getToken()  },
      body: JSON.stringify({
        treinador_id: data.treinador,
        nome: data.nome,
        descricao: data.descricao,
        data_inicial: data.data_inicial,
        data_final: data.data_final,
      }),
      mode: "cors",
    })
      .then((res) => res.json())
      .then((res) => {
        setModalEdit(false)
        refresh()
      });
  };

  const addExercise = async (data) => {
    await fetch(`${API.getURL()}/plano/${plano.id}/add`, {
      method: "POST",
      headers: { "content-type": "application/json", token: Auth.getToken()  },
      body: JSON.stringify({
        dia: modal.dia,
        exercicio_id: data.exercicio,
        series: data.series,
        repeticoes: data.repeticoes,
        carga: data.carga,
        tempo_distancia: data.tempo_distancia,
      }),
      mode: "cors",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setModal({ isShowing: false, dia: null });
        refresh();
      });
  };

  const arrayBlocos = () => {
    let e = []; //array de exercicios
    plano.blocos.map((bloco, index) => {
      return e.push(
        <UserContext.Consumer>
          {(user) => (
            <td key={index}>
              <div className="bloco-dia">
                <span>Dia {index + 1} </span>
                {(user.treinador_id === plano.treinador.id &&
                  user.roles.treinador) ||
                user.roles.admin ? (
                  <FaPlus
                    className="addExerciseBtn"
                    color="#4eec2f"
                    onClick={() => {
                      setModal({ isShowing: true, dia: index });
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="bloco">
                {bloco.map((exercicio, key) => {
                  return (
                    <Exercicio
                      key={key}
                      permission={
                        (user.treinador_id === plano.treinador.id &&
                          user.roles.treinador) ||
                        user.roles.admin
                      }
                      refresh={refresh}
                      exercicio={exercicio}
                    />
                  );
                })}
              </div>
            </td>
          )}
        </UserContext.Consumer>
      );
    });
    e = e.slice(0, plano.dias);
    e = twoDimensional(e, nDiasPrLinha); //passa um array unidimensional para bidimensional
    return e;
  };

  const calendarioTreino = () => {
    let calendario = [];
    let linhas = Math.ceil(plano.dias / nDiasPrLinha); //quantas linhas vai existir no plano, dias/7
    let blocos = arrayBlocos();

    for (let i = 0; i < linhas; i++) {
      calendario.push(<tr key={i}>{blocos[i]}</tr>);
    }

    return calendario;
  };

  if (plano === null || exercicios === null || isRefreshing) return <></>;

  return (
    <UserContext.Consumer>
      {(user) => {
        return (
          <>
            <div className="plano-component">
              <div className="plano-wrapper">
                <div className="plano-header">
                  <div className="plano-header-top">
                    <div
                      className="plano-nome"
                      onClick={() => {
                        setIsShowing(!isShowing);
                      }}
                    >
                      {plano.nome}
                    </div>
                    <div className="plano-data">
                      {plano.data_inicial} - {plano.data_final}
                    </div>
                    {user.treinador_id === plano.treinador.id ||
                    user.roles.admin ? (
                      <span
                        className="plano-copy-btn"
                        onClick={() => {
                          setModalCopy(true);
                        }}
                      >
                        <Badge>
                          <HiOutlineClipboardCopy />
                        </Badge>
                      </span>
                    ) : (
                      ""
                    )}
                    {user.treinador_id === plano.treinador.id ||
                    user.roles.admin ? (
                      <span
                        className="plano-edit-btn"
                        onClick={() => {
                          setModalEdit(true);
                        }}
                      >
                        <Badge>
                          <AiFillEdit />
                        </Badge>
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="plano-header-bottom">
                    <span>{plano.descricao}</span>
                    <div className="plano-createdby">
                      Criado por {plano.treinador.nome}
                    </div>
                  </div>
                </div>
                {isShowing ? (
                  <div className="plano-body">
                    <table>
                      <thead></thead>
                      <tbody>{calendarioTreino()}</tbody>
                    </table>
                  </div>
                ) : (
                  ""
                )}
                {footer ||
                user.id === plano.treinador.id ||
                user.roles.admin ? (
                  <div className="plano-footer">
                    <div className="plano-footer-header">
                      <span>Atletas</span>
                      <div
                        className="addAtletaBtn"
                        onClick={() => {
                          getTreinador();
                          setModalAddAtleta({ isShowing: true, plano: plano });
                        }}
                      >
                        <AiOutlinePlus />
                      </div>
                      <div
                        className="deleteAtletaBtn"
                        onClick={() => {
                          setModalDeleteAtleta({
                            isShowing: true,
                            plano: plano,
                          });
                        }}
                      >
                        <AiOutlineMinus />
                      </div>
                    </div>
                    {Object.values(plano.atletas_associados).map(
                      (atleta, key) => {
                        return (
                          <Link
                            to={`/app/profile/${atleta.id}`}
                            key={key}
                            className="plano-atleta"
                          >
                            {atleta.nome}
                          </Link>
                        );
                      }
                    )}
                  </div>
                ) : null}
              </div>
            </div>
            {modal.isShowing ? (
              <Modal
                isShowing={modal.isShowing}
                onRequestClose={() => {
                  setModal({ isShowing: false, dia: null });
                }}
              >
                <ModalHeader>Criar exercicio dia: {modal.dia + 1}</ModalHeader>

                <Form onSubmit={addExercise} submitBtnName="Guardar">
                  <label htmlFor="exercicio">Exercicio</label>
                  <Select name="exercicio" id="exercicio">
                    {Object.values(exercicios).map((exercicio, index) => {
                      let exists = false;

                      for (const [, value] of Object.entries(
                        plano.blocos[modal.dia]
                      )) {
                        if (value.exercicio_id === exercicio.id) exists = true;
                      }

                      if (exists) return null;

                      return (
                        <SelectOption key={index} value={exercicio.id}>
                          {exercicio.nome}
                        </SelectOption>
                      );
                    })}
                  </Select>

                  <label htmlFor="carga">Carga</label>
                  <Input
                    placeholder="Carga"
                    name="carga"
                    id="carga"
                    type="number"
                  />

                  <label htmlFor="carga">Repetições</label>
                  <Input
                    placeholder="Repetições"
                    name="repeticoes"
                    id="repeticoes"
                    type="number"
                  />

                  <label htmlFor="carga">Series</label>
                  <Input
                    placeholder="Series"
                    name="series"
                    id="series"
                    type="number"
                  />

                  <label htmlFor="carga">Tempo/Distancia</label>
                  <Input
                    placeholder="Tempo/Distancia"
                    name="tempo_distancia"
                    id="tempo_distancia"
                  />
                </Form>
              </Modal>
            ) : (
              ""
            )}

            {modalCopy ? (
              <Modal
                isShowing={modalCopy}
                onRequestClose={() => {
                  setModalCopy(false);
                }}
              >
                <ModalHeader>Copiar plano</ModalHeader>

                {admin ? (
                  <CreatePlanoForm
                    admin
                    callback={(data) => {
                      duplicate(data, data.treinador);
                    }}
                  />
                ) : (
                  <CreatePlanoForm
                    callback={(data) => {
                      duplicate(data, plano.treinador.id);
                    }}
                  />
                )}
              </Modal>
            ) : (
              ""
            )}

            {modalEdit ? (
              <Modal
                isShowing={modalEdit}
                onRequestClose={() => {
                  setModalEdit(false);
                }}
              >
                <ModalHeader>Editar plano</ModalHeader>

                {admin ? (
                  <EditPlanoForm callback={editPlano} plano={plano} admin />
                ) : (
                  <EditPlanoForm
                    callback={(data) => {
                      data.treinador = user.id;
                      editPlano(data);
                    }}
                    plano={plano}
                  />
                )}
              </Modal>
            ) : (
              ""
            )}

            {modalAddAtleta.isShowing && treinador ? (
              <Modal
                isShowing={modalAddAtleta.isShowing}
                onRequestClose={() => {
                  setModalAddAtleta({ isShowing: false, plano: null });
                }}
              >
                <ModalHeader>Associar atleta</ModalHeader>
                <Form onSubmit={addAtleta} submitBtnName="Associar">
                  <label htmlFor="atleta">Atleta</label>

                  <Select name="atleta" id="atleta">
                    {Object.values(treinador.atletas).map((atleta, index) => {
                      let exists = false;

                      for (const [, value] of Object.entries(
                        modalAddAtleta.plano.atletas_associados
                      )) {
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
            ) : (
              ""
            )}

            {modalDeleteAtleta.isShowing ? (
              <Modal
                isShowing={modalDeleteAtleta.isShowing}
                onRequestClose={() => {
                  setModalDeleteAtleta({ isShowing: false, plano: null });
                }}
              >
                <ModalHeader>Desassociar atleta</ModalHeader>
                <Form onSubmit={deleteAtleta} submitBtnName="Desassociar">
                  <label htmlFor="atleta">Atleta</label>

                  <Select name="atleta" id="atleta">
                    {Object.values(
                      modalDeleteAtleta.plano.atletas_associados
                    ).map((atleta, index) => {
                      return (
                        <SelectOption key={index} value={atleta.id}>
                          {atleta.nome}
                        </SelectOption>
                      );
                    })}
                  </Select>
                </Form>
              </Modal>
            ) : (
              ""
            )}
          </>
        );
      }}
    </UserContext.Consumer>
  );
}

function twoDimensional(arr, size) {
  var res = [];
  for (var i = 0; i < arr.length; i = i + size)
    res.push(arr.slice(i, i + size));
  return res;
}
