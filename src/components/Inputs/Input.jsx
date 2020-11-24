import { forwardRef, React } from "react";

import './input.css'

function Input({
    rules,
    errors,
    name,
    ...rest
}, ref) {

    const error = () => {
        if(errors[name]){
            return <span>{errors[name].message}</span>
        }
    }

    return (
        <div className="input">
            <input
                {...rest}
                name={name}
                ref={ref(rules)}
                className={""}
                type="text"/>
                <div className="errors">
                    {error()}
                </div>
        </div>

    )
}

export default forwardRef(Input)