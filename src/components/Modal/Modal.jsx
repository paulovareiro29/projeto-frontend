import { React } from "react";

import { AiOutlineClose } from "react-icons/ai";

import './modal.css'

export default function Modal({
    isShowing,
    onRequestClose,
    children
}) {

    onRequestClose = onRequestClose.bind(this)

    if (!isShowing) return <></>

    return (
        <div className={"modal-component "}>
            <div className="modal-wrapper">
                <div className="modal-close-btn">
                    <AiOutlineClose onClick={onRequestClose} />
                </div>

                <div className="modal-content">
                    {children}
                </div>

            </div>

        </div>
    )
}