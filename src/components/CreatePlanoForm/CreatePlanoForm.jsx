import { React, useEffect, useState } from "react";
import API from "../API";
import Form from "../Form/Form";
import Input from "../Form/Inputs/Input";
import SelectOption from "../Form/Inputs/Select/partials/SelectOption";
import Select from "../Form/Inputs/Select/Select";

import "./createplanoform.css";

export default function CreatePlanoForm({ callback, admin }) {
  const [wrongInfo, setWrongInfo] = useState(false);
  const [treinadores, setTreinadores] = useState(null);
  callback = callback.bind(this);

  useEffect(() => {
    async function getTreinadores() {
      await fetch(`${API.getURL()}/user/`, {
        method: "GET",
        headers: { "content-type": "application/json" },
        mode: "cors",
      })
        .then((res) => res.json())
        .then((res) => {
            let t = []
            Object.values(res).forEach((treinador,) => {
                if(treinador.roles.treinador){
                    t.push(treinador)
                }
            })
          setTreinadores(t);
        });
    }

    if (admin && treinadores === null) {
      getTreinadores();
    }
  });

  if(admin && treinadores === null){
    return null;
  }

  return (
    <div className="createplano-form">
      <div className={"error-info " + (wrongInfo ? "" : "hidden")}>
        <span>Data inicial não pode ser inferior à data final</span>
      </div>
      <Form
        onSubmit={(data) => {
          if (data.data_inicial > data.data_final) {
            setWrongInfo(true);
            return;
          }
          callback(data);
        }}
        submitBtnName="Guardar"
      >
        <label htmlFor="nome">Nome</label>
        <Input
          placeholder="Nome"
          name="nome"
          id="nome"
          rules={{
            required: "This is required",
          }}
        />

        {admin ? <label htmlFor="treinador">Treinador</label> : <></>}
        {admin ? <Select name="treinador">
            {Object.values(treinadores).map((treinador,index) => {
                return <SelectOption key={index} value={treinador.treinador_id}>{treinador.nome}</SelectOption>
            })}
        </Select> : <></>}

        <label htmlFor="descricao">Descrição</label>
        <Input placeholder="Descrição" name="descricao" id="descricao" />

        <label htmlFor="data_inicial">Inicio</label>
        <Input
          placeholder="Inicio"
          name="data_inicial"
          id="data_inicial"
          type="date"
          rules={{
            required: "This is required",
          }}
        />

        <label htmlFor="data_final">Fim</label>
        <Input
          placeholder="Fim"
          name="data_final"
          id="data_final"
          type="date"
          rules={{
            required: "This is required",
          }}
        />
      </Form>
    </div>
  );
}
