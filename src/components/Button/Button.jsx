import { React } from "react";

import './button.css'

export default function Button({title, styleType, bold, size, ...buttonProps}){



    return(
        <button 
            {...buttonProps}
            className={"btn " + (styleType ? styleType : 'primary')}
            style={{"fontSize": size + "px",
                    "fontWeight": bold ? "bold" : ''}}
            >{title}</button>
    )
}