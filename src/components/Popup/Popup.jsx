import { React} from "react";

import './popup.css'

export default function Popup({onClick,show, children }) {

    onClick = onClick.bind(this)

    return (
        <div  className={"popup-component"  }>
            <div onClick={onClick}  className={"popup-wrapper " + (show ? "show" : '')}>
                <div className="popup-content">
                    {children}
                </div>
            </div>

        </div>
    )
}