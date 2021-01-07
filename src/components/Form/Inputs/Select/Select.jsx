import { forwardRef, React } from "react";

import './select.css'

function Select({
    rules,
    errors,
    name,
    children,
    ...rest
}, ref) {

    const error = () => {
        if(errors[name]){
            return <span>{errors[name].message}</span>
        }
    }

    return (
        <div className="select-component">
            <select
                {...rest}
                name={name}
                ref={ref(rules)}>
                {children}
            </select>
            <div className="input-errors">
                {error()}
            </div>
        </div >
    )
}

export default forwardRef(Select)