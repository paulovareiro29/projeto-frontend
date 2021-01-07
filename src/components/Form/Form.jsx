import { cloneElement, React } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";

import './form.css'

export default function Form({ onSubmit, submitBtnName, children }) {

    onSubmit = onSubmit.bind(this)

    const { register, handleSubmit, errors } = useForm()


    const handleOnSubmit = (data) => {
        onSubmit(data)
    }

    const fields = (children.length !== undefined ?
        children.map((child, index) => (
            <div className="form-control" key={index}>
                {cloneElement(
                    child,
                    {
                        errors: errors,
                        ref: register,
                    })}
            </div>)
        ) :
        <div className="form-control" >
            {cloneElement(
                children,
                {
                    errors: errors,
                    ref: register,
                })}
        </div>)

    return (
        <div className="form-component">
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                {fields}
                <div className="form-control submit-btn">
                    <Button onSubmit={handleSubmit} title={submitBtnName ? submitBtnName : 'Submeter'} expanded />
                </div>
            </form>
        </div>
    )
}