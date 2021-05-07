import React, { Component } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

export default class GerenteCadastroItem extends Component {

    state = {
        id: "",
        nome: "",
        tipoItem: "1",
        valor: "",
        qtdRefeicao: "",
        tempoPreparo: ""
    }

    funcNomeChange = (event) => {
        this.setState({nome: event.target.value})
    }
    funcTipoItemChange = (event) => {
        this.setState({tipoItem: event.target.value})
    }
    funcValorChange = (event) => {
        this.setState({valor: event.target.value})
    }
    funcQtdRefeicaoChange = (event) => {
        this.setState({qtdRefeicao: event.target.value})
    }
    funcTempoPreparoChange = (event) => {
        this.setState({tempoPreparo: event.target.value})
    }
    
    gravarItem = () => {
        const dados = {
            "nome": this.state.nome,
            "tipoItem": this.state.tipoItem,
            "valor": this.state.valor,
            "qtdRefeicao": this.state.qtdRefeicao,
            "tempoPreparo": this.state.tempoPreparo
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        };

        const url = window.servidor + '/item/incluir/'
            fetch(url, requestOptions)
            .then(response => {
                if(response.status === 200){
                    toast.success('Item cadastrado com sucesso.')
                }else{
                    toast.error('Falha durante o cadastro.')
                }
            })
            .catch(erro => console.log(erro));
    }


    render(){
        return(
            <div className="row mt-5 p-3 mb-5">
                <div className="col-6 mt-2 container-fluid">
                        <h2 className="p-3 text-center mt-4">Cadastrar Item</h2>
                    <div className="mb-3">
                        <label className="col-form-label">Nome do Item</label>
                        <input value={this.state.nome} onChange={this.funcNomeChange} className="form-control" type="text" id="text-input"></input>
                    </div>
                    
                    <div>
                        <label className="col-form-label">Tipo Item</label>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <label className="input-group-text" for="inputGroupSelect01">{this.state.tipoItem}</label>
                        </div>
                        <select value={this.state.tipoItem} onChange={this.funcTipoItemChange} className="form-control" id="inputGroupSelect01">
                            <option selected value="0">Entrada</option>
                            <option value="1">Prato principal</option>
                            <option value="2">Sobremesa</option>
                            <option value="3">Bebida não alcoólica</option>
                            <option value="4">Bebida alcoólica</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="col-form-label">Quantidade de Refeições</label>
                        <input value={this.state.qtdRefeicao} onChange={this.funcQtdRefeicaoChange} className="form-control" type="number" id="number-input"/>
                    </div>


                    <div>
                        <label className="col-form-label">Valor</label>
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">R$</span>
                        </div>
                        <input value={this.state.valor} onChange={this.funcValorChange} className="form-control" type="number" step="0.05" id="number-input"/>
                    </div>
                    
                    <div>
                        <label className="col-form-label">Tempo de Preparo</label>
                    </div>
                    <div class="input-group mb-3">
                        <input value={this.state.tempoPreparo} onChange={this.funcTempoPreparoChange} className="form-control" type="number" id="number-input"/>
                        <div class="input-group-append">
                            <span class="input-group-text" id="inputGroup-sizing-default">minutos</span>
                        </div>
                    </div>


                    <div className="row mt-5">
                        <div className="col-3">
                            <button type="button" className="btn btn-primary" onClick={ () => this.gravarItem() }>Salvar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}