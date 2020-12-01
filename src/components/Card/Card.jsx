import { React } from "react";

import './styles/card.css'

export default function Card({ title,className, children }) {

    return (
        <div className={"card " + className}>
            {title
                ? <div className="card-header">
                    {title}
                </div> 
                : null
            }
            <div className="card-content">
                {children}
            </div>
        </div>
    )
}