import { Component } from "react";
import { Link } from "react-router-dom";
import './ReservaCustom.css';



export default class Reserva extends Component{
    render(){
        return(
            <div className="row mt-5 p-3 mb-5">  
                <div className="col-4 mt-2 container-fluid">
                    <u>
                        <h5 className="text-center">Solicitar Reserva</h5>
                    </u>
                    <div className="mb-3">
                        <label className="col-form-label">Data e Hora da Reserva</label>
                        <input className="form-control" type="datetime-local" id="datetime-local-input"/>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label">Quantidade de Lugares</label>
                        <input className="form-control" type="number" id="number-input"></input>
                    </div>
                    <div className="mb-3 text-center">
                        <h5>Horário de Funcionamento:
                            <p>De terça à Domingo: </p>
                                <p>17h às 23h</p> </h5>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label">Nome</label>
                        <input className="form-control" type="text" id="text-input"></input>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label">Telefone</label>
                        <input className="form-control" type="tel" id="telefone-input"/>
                    </div>
                    <div className="mb-3 text-center">
                        <h6>Já possui cadastro? <Link to="/Cadastro">Clique aqui</Link> para acessar</h6>
                    </div>
                    <div className="text-center">
                        <button type="button" className="btn btn-success">Solicitar</button>
                    </div>
                </div>
                
            </div>
        )
    }
}