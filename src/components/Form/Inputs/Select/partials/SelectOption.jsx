import { React } from "react";

import './selectoption.css'

export default function SelectOption({value, children}) {

    return (
        <option value={value}>{children}</option>
    )
}