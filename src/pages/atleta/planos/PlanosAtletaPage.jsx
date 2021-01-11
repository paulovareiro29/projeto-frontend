import { React, useEffect, useState } from "react";
import { BiRefresh } from "react-icons/bi";
import API from "../../../components/API";
import Badge from "../../../components/Badge/Badge";
import Loading from "../../../components/Loading/Loading";
import PlanoTreino from "../../../components/PlanoTreino/PlanoTreino";

import "./planosatletapage.css";

export default function PlanosAtletaPage({user}) {
  const [planos, setPlanos] = useState(null);
  const [exerciciosDisponiveis, setExerciciosDisponivel] = useState(null);

  useEffect(() => {
    async function fetchExercicios() {
      const data = await API.getExercises();
      setExerciciosDisponivel(data);
      
    }

    if (!exerciciosDisponiveis) fetchExercicios();

    async function fetchPlanos() {
      setPlanos(await API.getPlanosAtleta(user.id));
    }

    if (!planos && exerciciosDisponiveis) fetchPlanos();
  }, [ planos, exerciciosDisponiveis]);

 if (planos === null || exerciciosDisponiveis === null) {
    return <Loading />;
  }

  const ListaPlanos = () => {
    return Object.values(planos).map((plano, index) => {
      return <PlanoTreino defaultPlano={plano} exercicios={exerciciosDisponiveis}  key={index} />;
    });
  };

  return (
    <>
      <div className="planos-atleta">
        <div className="planos-atleta-header">
        <span className="planos-atleta-btn" onClick={() => {
                setPlanos(null)}}>
                    <Badge>
                        Refresh
                        <BiRefresh size={20}/>
                    </Badge>
                </span>
        </div>
        {ListaPlanos()}
      </div>
    </>
  );
}
