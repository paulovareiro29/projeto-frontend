import React from 'react'

import  Image  from "../images/logo.svg";

import '../styles/pages/home.css'

export default function Home() {
    return (
        <div className="home">
            <div className="home-wrapper">
                <div className="home-header">
                    <span className="title">Projeto de Sistemas de Informação</span>
                </div>
                <div className="home-body">
                    <span className="realizado-por">Realizado por <strong>Paulo Vareiro nº24473</strong></span>
                </div>
                
            </div>

        </div>
    )
}
