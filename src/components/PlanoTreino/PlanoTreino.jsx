import { React } from "react";
import Exercicio from "../Exercicio/Exercicio";


import './planotreino.css'

export default function PlanoTreino({ plano, editPermission }) {

    let d = []
    for (let i = 0; i < plano.dias; i++) {
        d.push(<th>Dia {i}</th>)
    }

    let e = []
    plano.blocos.map((bloco, index) => {
         e.push(<td key={index}>
            <div className="bloco">
                {bloco.map((exercicio, key) => {
                    return <Exercicio key={key} exercicio={exercicio} />
                })}
            </div>
        </td>
    )})

 const oi = (linha) => {
     return e[linha]
 }
    const p = () => {
        let a = []


        console.log(Math.ceil(plano.dias/7))
        for(let i = 0; i < Math.ceil(plano.dias/7); i++){
            let count = 0
            a.push(<tr>{oi(Math.ceil(plano.dias/7))}</tr>)
        }
        console.log(a)
        return a;

        console.log(a)
    }

    p()
    if (plano === null) return <></>
    return (
        <div className="planotreino-component">
            <div className="planotreino-wrapper">
                <table>
                    <thead>
                        <tr>
                            {d}
                        </tr>
                    </thead>
                    <tbody>
                          {p()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}