import { Component } from "react";


export default class GerenciarFuncionarios extends Component{

    state = {
        matricula: "",
        nome: "",
        cargo: "",
        login: "",
        senha: "",
        gerente: "",
        cpf: "",
        email: "",
        logradouro: "",
        numero: "",
        complemento: "",
        cidade: "",
        uf: "",
        cep: "",
        bairro: "",
        valorFrete: ""

    }






    render(){
        return(
            <div className="row mt-5 mb-5 ">
                <div>
                    <h2 className="p-3 text-center mt-4">Gerênciar Cardápio</h2>
                </div>
                <div>
                    <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-primary"><i className="bi bi-plus-circle"></i> Adicionar Item</button>
                    {/* MODAL PARA INSERIR UM NOVO ITEM */}
                    <div>
                        <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Incluir novo Item</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {/* FORMULARIO DO MODAL PARA INSERIR UM NOVO ITEM */}
                                    <form className="form-group textoright">
                                        <div className="col-8">
                                            <label className="form-label">Nome</label>
                                            <input maxLength='30' type="text" className="form-control" autoFocus></input>
                                        </div>
                                        <div className="col-5 mt-2">
                                            <label className="form-label">Cpf</label>
                                            <input maxLength='11' type="text" className="form-control" ></input>
                                        </div>
                                        <div className="col-5 mt-2">
                                            <label className="form-label">Opção de Café da Manhã</label>
                                            <input maxLength='50' type="text" className="form-control" ></input>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Save changes</button>
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
                                                    <button className="btn btn-sm btn-warning"><i className="bi bi-trash"></i> Deletar</button>
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