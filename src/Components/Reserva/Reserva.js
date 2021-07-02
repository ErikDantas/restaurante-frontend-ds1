import { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import './ReservaCustom.css';



export default class Reserva extends Component{
    state = {
        data: "",
        qtdlugares: "",
        nome: "",
        telefone:""
    }

    funcDataChange= (event) => {
        this.setState({data: event.target.value})
    }
    funcQtdLugaresChange= (event) => {
        this.setState({qtdlugares: event.target.value})
    }
    funcNomeChange= (event) => {
        this.setState({nome: event.target.value})
    }
    funcTelefoneChange= (event) => {
        this.setState({telefone: event.target.value})
    }



    funcEfetuarReser = () => {
        var dados = {
            dataHoraReserva: this.state.data,
            nomeUsuario: this.state.nome,
            telefone: this.state.telefone,
            qtdLugares: this.state.qtdlugares,
            status: "Aguardando Confirmação"
        }


        const requestOptions = {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
                
        };

        
        
        var url = window.servidor+"/reserva/incluir"

        fetch(url,requestOptions)
        .then((response) => {
            if(response.status===200){
                toast.success("Reserva efetuada com sucesso.")
                window.location.reload()
            }else{
                toast.error("Falha durante a solicitação da reserva.")
            }
        })
    }


    render(){
        return(
            <div className="row mt-5 p-3 mb-5">  
            <ToastContainer/>
                <div className="col-4 mt-4 container-fluid">
                        <h2 className="text-center mb-5">Solicitar Reserva</h2>
                    <div className="mb-3">
                        <label className="col-form-label">Data e Hora da Reserva</label>
                        <input onChange={this.funcDataChange} className="form-control" type="datetime-local" id="datetime-local-input"/>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label">Quantidade de Lugares</label>
                        <input onChange={this.funcQtdLugaresChange} className="form-control" type="number" id="number-input"></input>
                    </div>
                    <div className="mb-3 text-center">
                        <h5>Horário de Funcionamento:
                            <p>De terça à Domingo: </p>
                                <p>17h às 23h</p> </h5>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label">Nome</label>
                        <input onChange={this.funcNomeChange} className="form-control" type="text" id="text-input"></input>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label">Telefone</label>
                        <input maxLength="11" onChange={this.funcTelefoneChange} className="form-control" type="tel" id="telefone-input"/>
                    </div>

                    <div className="text-center">
                        <button onClick={() => this.funcEfetuarReser()} type="button" className="btn btn-success">Solicitar</button>
                    </div>
                </div>
                
            </div>
        )
    }
}