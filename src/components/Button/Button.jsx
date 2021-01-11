import { React } from "react";

import './button.css'

export default function Button({title, styleType, bold, size, expanded, ...buttonProps}){



    return(
        <button 
            {...buttonProps}
            className={"btn " + (styleType ? styleType : ' primary ') + (expanded ? ' expanded ' : '')}
            style={{"fontSize": size + "px",
                    "fontWeight": bold ? "bold" : ''}}
            >{title}</button>
    )
}