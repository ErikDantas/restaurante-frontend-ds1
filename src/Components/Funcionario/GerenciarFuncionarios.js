import { Component } from "react";
import { toast } from "react-toastify";


export default class GerenciarFuncionarios extends Component{

    state = {
        matricula: "",
        nome: "",
        cargo: "",
        login: "",
        senha: "",
        gerente: "false",
        cpf: "",
        email: "",
        logradouro: "",
        numero: "",
        complemento: "",
        cidade: "",
        uf: "",
        cep: "",
        bairro: "",
        valorFrete: "",
        funcionarios: []

    }

    funcNomeChange = (event) => {
        this.setState({nome: event.target.value})
    }

    funcCargoChange = (event) => {
        this.setState({cargo: event.target.value})
    }
    funcLoginChange = (event) => {
        this.setState({login: event.target.value})
    }
    funcSenhaChange = (event) => {
        this.setState({senha: event.target.value})
    }
    funcGerenteChange = (event) => {
        this.setState({gerente: event.target.checked})
    }
    funcCpfChange = (event) => {
        this.setState({cpf: event.target.value})
    }
    funcEmailChange = (event) => {
        this.setState({email: event.target.value})
    }


    preencherTabelaFuncionarios = () => {
        const url = window.servidor + '/funcionario/'
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({funcionarios: data}))
    }

    componentDidMount(){
        this.preencherTabelaFuncionarios()
    }

    gravarNovoFuncionario = () => {
        const novofuncionario = {
            nome: this.state.nome,
            cargo: this.state.cargo,
            login: this.state.login,
            senha: this.state.senha,
            gerente: this.state.gerente,
            cpf: this.state.cpf,
            email: this.state.email
        };


        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novofuncionario)
        };

        const url = window.servidor + "/funcionario/incluir"

        fetch(url, requestOptions)
            .then((dados) => {
                if(dados.status===200){
                    this.preencherTabelaFuncionarios()
                    toast.success("Adicionado com sucesso.")
                }
            })
    }

    deletarFuncionario = (x) => {
        const url = window.servidor + '/funcionario/'+x.matricula
        fetch(url)
            .then((response) => {
                if(response.status===200){
                    toast.success("Funcionário deletado com sucesso.")
                    this.preencherTabelaFuncionarios();
                }else{
                    toast.error("Falha ao deletar funcionário.")

                }
            })
    }


    render(){
        return(
            <div className="row mt-5 mb-5 ">
                <div>
                    <h2 className="p-3 text-center mt-4">Gerênciar Funcionários</h2>
                </div>
                <div>
                    <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-primary"><i className="bi bi-person-plus"></i> Adicionar Funcionário</button>
                    {/* MODAL PARA INSERIR UM NOVO ITEM */}
                    <div>
                        <div className="modal fade"  id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Incluir novo Funcionário <i className="bi bi-person-plus"></i> </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {/* FORMULARIO DO MODAL PARA INSERIR UM NOVO ITEM */}
                                    <form className="form-group textoright">
                                        <div className="col-10">
                                            <label className="form-label">Nome</label>
                                            <input value={this.state.nome} onChange={this.funcNomeChange} maxLength='50' type="text" className="form-control" autoFocus></input>
                                        </div>
                                        <div className="col-6 mt-2">
                                            <label className="form-label">Cargo</label>
                                            <input value={this.state.cargo} onChange={this.funcCargoChange} maxLength='30' type="text" className="form-control" ></input>
                                        </div>
                                        <div className="col-3 mt-2">
                                            <label className="form-label">Login</label>
                                            <input value={this.state.login} onChange={this.funcLoginChange} maxLength='10' type="text" className="form-control" ></input>
                                        </div>
                                        <div className="col-5 mt-2">
                                            <label className="form-label">Senha</label>
                                            <input required value={this.state.senha} onChange={this.funcSenhaChange} maxLength='20' type="password" className="form-control" ></input>
                                        </div>
                                        <div className="col-3 mt-2">
                                            <label className="form-label">CPF</label>
                                            <input value={this.state.cpf} onChange={this.funcCpfChange} maxLength='11' type="text" className="form-control" ></input>
                                        </div>
                                        <div className="col-8 mt-2">
                                            <label className="form-label">Email</label>
                                            <input maxLength='40' type="text" className="form-control" ></input>
                                        </div>
                                        <div className="form-check col-5 mt-2">
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Gerente?
                                            </label>
                                            <input className="form-check-input" type="checkbox" onChange={this.funcGerenteChange} value="" id="flexCheckDefault"/>
                                            
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="button" onClick={() => this.gravarNovoFuncionario()} className="btn btn-primary">Salvar</button>
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
                                    <th scope="col">Matricula</th>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Cargo</th>
                                    <th scope="col">Login</th>
                                    <th scope="col">Senha</th>
                                    <th scope="col">Gerente?</th>
                                    <th scope="col">CPF</th>
                                    <th scope="col">Email</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.funcionarios && this.state.funcionarios.map( funcionario => {
                                    return <tr key={funcionario.matricula}>
                                        <th scope="row">{funcionario.matricula}</th>
                                        <td>{funcionario.nome}</td>
                                        <td>{funcionario.cargo}</td>
                                        <td>{funcionario.login}</td>
                                        <td>{funcionario.senha}</td>
                                        <td>{(funcionario.gerente).toString()}</td>
                                        <td>{funcionario.cpf}</td>
                                        <td>{funcionario.email}</td>
                                        <td className="text-center">
                                            <div className="btn-group"> 
                                                <div className="p-1">
                                                    <button className="btn btn-sm btn-info"><i className="bi bi-pencil-square"></i> Editar</button>
                                                </div>
                                                <div className="p-1">
                                                    <button onClick={() => this.deletarFuncionario(funcionario)} className="btn btn-sm btn-warning"><i className="bi bi-trash"></i> Deletar</button>
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