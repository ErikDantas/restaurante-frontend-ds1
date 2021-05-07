import React, { Component } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
export default class GerenciarCardapio extends Component{

    state = {
        id: "",
        nome: "",
        valor: "",
        tipoItem: "0",
        tempoPreparo: "",
        qtdRefeicao: "",
        alterando: false,
        itens: []
    }

    preencherTabelaItens = () => {
        const url = window.servidor + '/item/'
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({itens: data}));
    }

    funcApagaItem = (item) => {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        };

        const url = window.servidor + '/item/' + item.id
        console.info(url)
        fetch(url, requestOptions)
            .then(this.preencherTabelaItens())
            .catch(erro => console.log(erro));
    }

    componentDidMount(){
        this.preencherTabelaItens()
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
            <div className="row mt-5 mb-5 ">
                <div>
                    <h2 className="p-3 text-center mt-4">Gerenciar Cardápio</h2>
                </div>
                <div>
                    <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-primary"><i className="bi bi-plus-circle"></i> Adicionar Item</button>
                    {/* MODAL PARA INSERIR UM NOVO ITEM */}
                    <div>
                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Incluir novo Item</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {/* FORMULARIO DO MODAL PARA INSERIR UM NOVO ITEM */}
                                    <form className="form-group textoright">
                                        
                                        <div className="row mt-1 p-1 mb-1">
                                            <div className="col-6 mt-2 container-fluid">
                                                <div className="mb-3">
                                                    <label className="col-form-label">Nome do Item</label>
                                                    <input value={this.state.nome} onChange={this.funcNomeChange} className="form-control" type="text" id="text-input"></input>
                                                </div>
                                                
                                                <div>
                                                    <label className="col-form-label">Tipo Item</label>
                                                </div>
                                                <div className="input-group mb-3">
                                                    
                                                    <select value={this.state.tipoItem} onChange={this.funcTipoItemChange} selected="0" className="form-control" id="inputGroupSelect01">
                                                        <option value="0">Entrada</option>
                                                        <option value="1">Prato Principal</option>
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
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text" id="inputGroup-sizing-default">R$</span>
                                                    </div>
                                                    <input value={this.state.valor} onChange={this.funcValorChange} className="form-control" type="number" step="0.05" id="number-input"/>
                                                </div>
                                                
                                                <div>
                                                    <label className="col-form-label">Tempo de Preparo</label>
                                                </div>
                                                <div className="input-group mb-3">
                                                    <input value={this.state.tempoPreparo} onChange={this.funcTempoPreparoChange} className="form-control" type="number" id="number-input"/>
                                                    <div className="input-group-append">
                                                        <span className="input-group-text" id="inputGroup-sizing-default">minutos</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={ () => this.preencherTabelaItens(this.state.id) } data-bs-dismiss="modal">Fechar</button>
                                    <button type="button" className="btn btn-primary" onClick={ () => this.gravarItem() }>Salvar</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 container">
                    <div className="mt-3">
                        <table className="table table-hover table-responsive table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Valor</th>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">Tempo de Preparo</th>
                                    <th scope="col">Quantidade Disponível</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.itens && this.state.itens.map( item => {
                                    return <tr key={item.id}>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.nome}</td>
                                        <td>{item.valor}</td>
                                        <td>{item.tipoItem}</td>
                                        <td>{item.tempoPreparo}</td>
                                        <td>{item.qtdRefeicao}</td>
                                        <td className="text-center">
                                            <div className="btn-group"> 
                                                <div className="p-1">
                                                    <button className="btn btn-sm btn-info"><i className="bi bi-pencil-square"></i> Editar</button>
                                                </div>
                                                <div className="p-1">
                                                    <button className="btn btn-sm btn-warning" onClick={ () => this.funcApagaItem(item)} ><i className="bi bi-trash"></i> Deletar</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}