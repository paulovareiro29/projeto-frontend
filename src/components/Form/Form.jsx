import { cloneElement, React, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";


export default function Form({ onSubmit,submitBtnName, children }) {

    onSubmit = onSubmit.bind(this)
    
    const {register, handleSubmit, watch, errors} = useForm()


    const handleOnSubmit = (data) => {
        console.log(data)
    }

    const fields = children.map((child, index) => (
        <div className="form-control" key={index}>
            {cloneElement(
                child,
                {
                    errors: errors,
                    ref: register,
                })}
        </div>
    ))

    return (
        <form onSubmit={handleSubmit(handleOnSubmit)}>
            {fields}
            <div className="form-control">
                <Button onSubmit={handleSubmit} title={submitBtnName ? submitBtnName : 'Submeter'} expanded />
            </div>
        </form>
    )
}