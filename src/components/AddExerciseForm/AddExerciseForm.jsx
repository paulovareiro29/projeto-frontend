import { React, useEffect, useState } from "react";

import Select from "../../components/Form/Inputs/Select/Select";
import Form from "../../components/Form/Form";
import Input from "../../components/Form/Inputs/Input";
import SelectOption from "../../components/Form/Inputs/Select/partials/SelectOption";
import API from "../API";
import Loading from "../Loading/Loading";


export default function AddExerciseForm({onSuccess}) {

    const [tiposExercicio, setTiposExercicio] = useState(null)

    useEffect(() => {
        async function fetchData() {
            const data = await API.getExerciseTypes()
            console.log(data)
            setTiposExercicio(data)
        }


        if (!tiposExercicio)
            fetchData()
    })


    if(!tiposExercicio) return <Loading />

    onSuccess = onSuccess.bind(this)

    const tipos = Object.values(tiposExercicio).map((tipo, index) => {
        return <SelectOption value={tipo.id}>{tipo.nome}</SelectOption>
    })

    const onSubmit = (e) => {
        const exercicio = {
            "nome": e.nome,
            "descricao": e.descricao,
            "tipoExercicio_id": e.tipo
        }

        API.createExercise(exercicio)
        onSuccess()
    }

    return (
        <Form submitBtnName="Criar" onSubmit={onSubmit}>

            <Input type="text" name="nome" placeholder="Nome do exercicio" rules={
                {
                    required: "This is required",
                    minLength: { value: 3, message: "Minimo de 3 caracteres" }
                }
            } />
            <Input type="text" name="descricao" placeholder="Descricao" />

            <Select name="tipo">
                {tipos}
            </Select>
        </Form>
    )
}