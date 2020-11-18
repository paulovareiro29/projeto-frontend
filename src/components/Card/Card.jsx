import { React } from "react";

import './styles/card.css'

export default function Card({ title, children }) {

    return (
        <div className="card">
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