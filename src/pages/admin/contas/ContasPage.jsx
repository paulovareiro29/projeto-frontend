import { React, useState } from "react";
import API from "../../../components/API";
import Button from "../../../components/Button/Button";
import Form from "../../../components/Form/Form";
import Checkbox from "../../../components/Form/Inputs/Checkbox/Checkbox";
import Input from "../../../components/Form/Inputs/Input";
import Modal from "../../../components/Modal/Modal";
import ModalHeader from "../../../components/Modal/partials/ModalHeader";
import Roles from "./roles/Roles";

export default function ContasPage() {
  const [addContaModal, setAddContaModal] = useState(false);

  const addConta = async (data) => {
    await fetch(`${API.getURL()}/user/`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        username: data.username,
        pass: data.password,
        nome: data.nome,
        atleta: data.atleta,
        treinador: data.treinador,
        admin: data.admin,
      }),
      mode: "cors",
    })
      .then((res) => res.json())
      .then((res) => {
        setAddContaModal(false);
      });
  };

  return (
    <>
      <div className="contas-page">
        <div className="contas-page-wrapper">
          <div className="contas-page-header">
            <Button
              onClick={() => {
                setAddContaModal(true);
              }}
              expanded
              title="Criar Conta"
            />
          </div>
          <div className="contas-page-body">
            <div className="contas-page-roles">
              <Roles />
            </div>
          </div>
        </div>
      </div>
      <Modal
        isShowing={addContaModal}
        onRequestClose={() => {
          setAddContaModal(false);
        }}
      >
        <ModalHeader>Criar Conta</ModalHeader>

        <Form submitBtnName="Criar" onSubmit={addConta}>
          <label htmlFor="username">Username</label>
          <Input
            placeholder="Username"
            name="username"
            id="username"
            rules={{
              required: "This is required",
            }}
          />

          <label htmlFor="password">Password</label>
          <Input
            placeholder="Password"
            name="password"
            id="password"
            type="password"
            rules={{
              required: "This is required",
            }}
          />

          <label htmlFor="nome">Nome</label>
          <Input
            placeholder="Nome"
            name="nome"
            id="nome"
            rules={{
              required: "This is required",
            }}
          />

          <label htmlFor="">Permissões</label>
          <Checkbox label="Atleta" name="atleta" id="atleta" />

          <Checkbox label="Treinador" name="treinador" id="treinador" />

          <Checkbox label="Administrador" name="admin" id="admin" />
        </Form>
      </Modal>
    </>
  );
}
