import { React } from "react";

import './selectoption.css'

export default function SelectOption({value, children, ...rest}) {

    return (
        <option {...rest} value={value}>{children}</option>
    )
}