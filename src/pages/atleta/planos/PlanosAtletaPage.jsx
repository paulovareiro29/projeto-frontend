import { React, useEffect, useState } from "react";
import API from "../../../components/API";
import Auth from "../../../components/Auth";
import Loading from "../../../components/Loading/Loading";
import PlanoTreino from "../../../components/PlanoTreino/PlanoTreino";

import "./planosatletapage.css";

export default function PlanosAtletaPage() {
  const [user, setUser] = useState(null);
  const [planos, setPlanos] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      setUser(await API.getUserByToken(await Auth.getToken()));
    }

    async function fetchPlanos() {
      setPlanos(await API.getPlanosAtleta(user.id));
    }

    if (!user) fetchUser();

    if (!planos && user) fetchPlanos();
  }, [user, planos]);

  if (!user || !planos) {
    return <Loading />;
  }

  const ListaPlanos = () => {
    return Object.values(planos).map((plano, index) => {
      return <PlanoTreino defaultPlano={plano} key={index} />;
    });
  };

  return (
    <>
      <div className="planos-atleta">{ListaPlanos()}</div>
    </>
  );
}
