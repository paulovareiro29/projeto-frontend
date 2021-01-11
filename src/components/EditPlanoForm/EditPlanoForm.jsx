import { React, useEffect, useState } from "react";
import API from "../API";
import Form from "../Form/Form";
import Input from "../Form/Inputs/Input";
import SelectOption from "../Form/Inputs/Select/partials/SelectOption";
import Select from "../Form/Inputs/Select/Select";

import './editplanoform.css'

export default function EditPlanoForm({ callback, plano, admin }) {
    const [wrongInfo, setWrongInfo] = useState(false);
    const [treinadores, setTreinadores] = useState(null);

  useEffect(() => {
    async function getTreinadores() {
      await fetch(`${API.getURL()}/user/`, {
        method: "GET",
        headers: { "content-type": "application/json" },
        mode: "cors",
      })
        .then((res) => res.json())
        .then((result) => {
          let t = [];
          Object.values(result).forEach((user) => {
            if (user.roles.treinador) t.push(user);
          });
          setTreinadores(t);
        });
    }

    if (!treinadores) getTreinadores();
  }, [treinadores]);

  callback = callback.bind(this);

  if (treinadores === null) {
    return null;
  }

  return (
    <div className="editplano-form">
      <div className={"error-info " + (wrongInfo ? "" : "hidden")}>
        <span>Data inicial não pode ser inferior à data final</span>
      </div>
      <Form onSubmit={(data) => {
          if (data.data_inicial > data.data_final) {
            setWrongInfo(true);
            return;
          }
          callback(data);
        }}>
        <label htmlFor="nome">Nome</label>
        <Input
          defaultValue={plano.nome}
          name="nome"
          placeholder="Nome"
          id="nome"
        />

        <label htmlFor="descricao">Descrição</label>
        <Input
          defaultValue={plano.descricao}
          name="descricao"
          placeholder="Descrição"
          id="descricao"
        />

        {admin ? <label htmlFor="treinador">Treinador</label> : <></>}
        {admin ? (
          <Select name="treinador" defaultValue={plano.treinador.id}>
            {Object.values(treinadores).map((treinador, index) => {
              return (
                <SelectOption key={index} value={treinador.treinador_id}>
                  {treinador.nome}
                </SelectOption>
              );
            })}
          </Select>
        ) : (
          <></>
        )}

        <label htmlFor="data_inicial">Inicio</label>
        <Input
          type="date"
          defaultValue={plano.data_inicial}
          name="data_inicial"
          id="data_inicial"
        />

        <label htmlFor="data_final">Fim</label>
        <Input
          type="date"
          defaultValue={plano.data_final}
          name="data_final"
          id="data_final"
        />
      </Form>
    </div>
  );
}
