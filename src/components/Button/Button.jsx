import { React } from "react";

import './button.css'

export default function Button({title, type, bold, size, ...buttonProps}){



    return(
        <button 
            {...buttonProps}
            className={"btn " + (type ? type : 'primary')}
            style={{"fontSize": size + "px",
                    "fontWeight": bold ? "bold" : ''}}
            >{title}</button>
    )
}