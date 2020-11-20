import { React, useState } from "react";

import './input.css'

export default function TextField({
    value,
    ...rest
}) {

    const [currentValue, setCurrentValue] = useState(value ? value : '')

    const handleChange = (e) => {
        setCurrentValue(e.target.value)
    }

    return (
        <input
        {...rest}
        className="input"
        type="text"
        onChange={handleChange}
        value={currentValue} />
    )
}