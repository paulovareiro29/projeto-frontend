import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../components/API";

import Badge from "../components/Badge/Badge";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import { UserContext } from "../components/Context";
import Form from "../components/Form/Form";
import Input from "../components/Form/Inputs/Input";
import Loading from "../components/Loading/Loading";
import Modal from "../components/Modal/Modal";
import ModalHeader from "../components/Modal/partials/ModalHeader";

import Logo from "../images/profile.jpg";

import "../styles/pages/profile.css";

function MudarPasswordForm({ callback }) {
  const [wrongInfo, setWrongInfo] = useState(false);

  callback = callback.bind(this);

  return (
    <div className="mudar-password-form">
      <div className={"error-info " + (wrongInfo ? "" : "hidden")}>
        <span>Passwords não são iguais</span>
      </div>
      <Form
        submitBtnName="Guardar"
        onSubmit={(data) => {
          if (data.new_password !== data.new_password_confirm) {
            setWrongInfo(true);
            return;
          }
          callback(data.new_password);
        }}
      >
        <label htmlFor="new_password">Nova password</label>
        <Input
          type="password"
          name="new_password"
          rules={{
            required: "Obrigatório",
            minLength: { value: 8, message: "Minimo de 8 caracteres" },
          }}
        />

        <label htmlFor="new_password_confirm">Confirmar nova password</label>
        <Input
          type="password"
          name="new_password_confirm"
          rules={{
            required: "Obrigatório",
            minLength: { value: 8, message: "Minimo de 8 caracteres" },
          }}
        />
      </Form>
    </div>
  );
}

export default function Profile() {
  let { id } = useParams();

  const [editing, setEditing] = useState(false);
  const [info, setInfo] = useState(undefined);

  const [modal, setModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await API.getUser(id);

      setInfo(data);
      if (refresh === true) setRefresh(false);
    }

    if (info === undefined || refresh === true) {
      fetchData();
    }
  });

  const editButtonClick = () => {
    setEditing(true);
  };

  const saveEdit = async (e) => {
    console.log(e.nome);

    //atribuir ID
    await fetch(`http://localhost/projeto-backend/user/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        //"username": info.username,
        //"pass": info.password,
        nome: e.nome,
        morada: e.morada,
        email: e.email,
        admin: info.roles.admin,
        atleta: info.roles.atleta,
        treinador: info.roles.treinador,
      }),
      mode: "cors",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });

    setRefresh(true);
    setEditing(false);
  };

  const updatePassword = async (new_password) => {
    await fetch(`${API.getURL()}/user/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        pass: new_password,
      }),
      mode: "cors",
    })
      .then((res) => res.json())
      .then((res) => {
        setModal(false);
      });
  };

  if (info === undefined || refresh) return <Loading />;

  return (
    <UserContext.Consumer>
      {(user) => {
        return (
          <div id="profile">
            <div className="profile-header">
              <div className="profile-background-wrapper">
                <div className="profile-background"></div>
              </div>
              <div className="profile-info-wrapper">
                <div className="profile-photo">
                  <img src={Logo} alt="" />
                </div>

                <div className="profile-info">
                  <div className="profile-info-name">{info.nome}</div>
                  <div className="profile-info-email">{info.email}</div>
                  <div className="profile-info-roles">
                    {info.roles.admin ? <Badge>Administrador</Badge> : null}
                    {info.roles.treinador ? <Badge>Treinador</Badge> : null}
                    {info.roles.atleta ? <Badge>Atleta</Badge> : null}
                  </div>
                </div>

                {user.id === id || user.roles.admin ? (
                  <div className="profile-edit-info">
                    {!editing ? (
                      <Button
                        onClick={editButtonClick}
                        title="Editar perfil"
                        size={15}
                        styleType={"secondary"}
                        bold
                      />
                    ) : null}
                    <div className="edit-password-btn">
                      <Button
                        onClick={() => {
                          setModal(true);
                        }}
                        title="Mudar password"
                        size={15}
                        styleType={"secondary"}
                        bold
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="profile-content">
              {editing ? (
                <Card title="Informação">
                  <Form onSubmit={saveEdit} submitBtnName="Guardar">
                    <label htmlFor="nome">Nome</label>
                    <Input
                      defaultValue={info.nome}
                      placeholder="Nome"
                      name="nome"
                      id="nome"
                      rules={{
                        required: "This is required",
                      }}
                    />

                    <label htmlFor="email">Email</label>
                    <Input
                      defaultValue={info.email}
                      placeholder="Email"
                      name="email"
                      id="email"
                    />

                    <label htmlFor="morada">Morada</label>
                    <Input
                      defaultValue={info.morada}
                      placeholder="Morada"
                      name="morada"
                      id="morada"
                    />
                  </Form>
                </Card>
              ) : (
                <Card title={"Informação"}>
                  <table>
                    <tbody>
                      <tr>
                        <th>Nome</th>
                        <td>{info.nome}</td>
                      </tr>
                      <tr>
                        <th>Email</th>
                        <td>{info.email}</td>
                      </tr>
                      <tr>
                        <th>Morada</th>
                        <td>{info.morada}</td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
              )}

              {user.id === id || user.roles.admin ? (
                <Modal
                  isShowing={modal}
                  onRequestClose={() => {
                    setModal(false);
                  }}
                >
                  <ModalHeader>Mudar password</ModalHeader>
                  <MudarPasswordForm callback={updatePassword} />
                </Modal>
              ) : null}
            </div>
          </div>
        );
      }}
    </UserContext.Consumer>
  );
}
