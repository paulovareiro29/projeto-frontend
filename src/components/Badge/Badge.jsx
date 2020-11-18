import { React } from "react";

import './badge.css'

export default function Badge({bold, color, type, children}){
    return (
        <span 
        style={{backgroundColor: color,
                fontWeight: bold ? 'bold' : ''}}
        className={"badge " + (type ? type : 'primary')}
        >{children}</span>
    )
}