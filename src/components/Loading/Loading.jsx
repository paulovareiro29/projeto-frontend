import { React } from "react";

import LoadingImg from "../../images/loading-spinner.gif"

import './loading.css'

export default function Loading() {

    return (
        <div className="loading-component">
            <img src={LoadingImg} alt=""/>
        </div>
    )
}