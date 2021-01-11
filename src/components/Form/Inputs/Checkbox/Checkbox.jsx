import { forwardRef, React } from "react";

import './checkbox.css'

function Checkbox({
    rules,
    errors,
    name,
    label,
    ...rest
}, ref) {


    const error = () => {
        if(errors[name]){
            return <span>{errors[name].message}</span>
        }
    }

    return (
        <div className="checkbox-component">
            
            <input
                type="checkbox"
                {...rest}
                name={name}
                ref={ref(rules)}/>
            <label className="checkbox-label" htmlFor={name}>{label}</label>
            <div className="input-errors">
                {error()}
            </div>
        </div >
    )
}


export default forwardRef(Checkbox)