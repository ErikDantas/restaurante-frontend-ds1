import { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import './FuncionarioCSS.css'


export default class GerenciarFuncionarios extends Component{

    state = {
        matricula: "",
        nome: "",
        cargo: "",
        login: "",
        senha: "",
        endereco: "",
        gerente: "false",
        cpf: "",
        email: "",
        logradouro: "",
        numero: "",
        complemento: "",
        cidade: "",
        uf: [],
        ufselecionado: "",
        bairroselecionado: "",
        cep: "",
        bairro: [],
        valorFrete: "",
        funcionarios: [],
        idendereco: "",
        funcionarioselecionado: ""
    }

    enderecoNull = (x) => 
    {
        if(x.endereco===null){
            return <div> - </div>
        }else{
            return <div>{(x.endereco.logradouro)+" / Nº "+(x.endereco.numero) + " / Bairro: "+(x.endereco.bairro.nome)}</div>
        }
        
    }

    funcLogradouroChange = (event) => {
        this.setState({logradouro: event.target.value})
    }
    funcNumeroChange = (event) => {
        this.setState({numero: event.target.value})
    }
    funcComplementoChange = (event) => {
        this.setState({complemento: event.target.value})
    }

    funcBairroChange = (event) => {
        this.setState({bairroselecionado: event.target.value})
    }

    funcUfChange = (event) => {
        this.setState({ufselecionado: event.target.value})
    }

    funcCidadeChange = (event) => {
        this.setState({cidade: event.target.value})
    }

    funcCepChange = (event) => {
        this.setState({cep: event.target.value})
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
            .then((data) => {
                this.setState({funcionarios: data}
            
            )})
            
    }

    getAllTipoUf = () => {
        const url = window.servidor + '/endereco/tipouf'
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                this.setState({uf: data},
            )})
            
    }

    getAllBairros = () => {
        const url = window.servidor + '/bairro/'
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                this.setState({bairro: data}
            )})
            
    }


    componentDidMount(){
        this.preencherTabelaFuncionarios()
        this.getAllTipoUf()
        this.getAllBairros()
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

        if(novofuncionario.cpf.length!==0 && novofuncionario.senha.length>=4 && novofuncionario.login.length>=4 && novofuncionario.cargo.length!==0){
            fetch(url, requestOptions)
            .then((dados) => {
                if(dados.status===200){
                    this.preencherTabelaFuncionarios()
                    toast.success("Adicionado com sucesso.")
                }
            })
        }else{
            toast.error("Preencha todos os campos.")
        }
        
    }

    deletarFuncionario = (x) => {
        const url = window.servidor + '/funcionario/'+x.matricula

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        

        fetch(url,requestOptions)
            .then((response) => {
                if(response.status===200){
                    toast.success("Funcionário deletado com sucesso.")
                    this.preencherTabelaFuncionarios();
                }else{
                    toast.error("Falha ao deletar funcionário.")

                }
            })
    }


    atualizarEndereco = (x) => {
        const dados = {
            logradouro: this.state.logradouro,
            numero: this.state.numero,
            complemento: this.state.complemento,
            bairro: this.state.bairroselecionado,
            cidade: this.state.cidade,
            uf: this.state.ufselecionado,
            cep: this.state.cep
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        };

        const url = window.servidor + "/endereco/incluir"

            fetch(url, requestOptions)
                .then(response => response.json())
                .then((data) => {
                    console.log(data)
                })
        


    }


    render(){
        return(
            <div className="row mt-5 mb-5 ">
                <ToastContainer/>
                <div>
                    <h2 className="p-3 text-center mt-4">Gerenciar Funcionários</h2>
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
                                            <input required minLength="4" value={this.state.senha} onChange={this.funcSenhaChange} maxLength='20' type="password" className="form-control" ></input>
                                            <small id="emailHelp" className="form-text text-muted">Mínimo de 4 digitos</small>
                                        </div>
                                        <div className="col-4 mt-2">
                                            <label className="form-label">CPF</label>
                                            <input minLength="11" maxLength="11" value={this.state.cpf} onChange={this.funcCpfChange} type="text" className="form-control" />
                                        </div>
                                        <div className="col-8 mt-2">
                                            <label className="form-label">Email</label>
                                            <input maxLength='40' value={this.state.email} onChange={this.funcEmailChange} type="text" className="form-control" ></input>
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
                                    <button type="button" onClick={() => this.gravarNovoFuncionario()} className="btn btn-primary" data-bs-dismiss="modal">Salvar</button>
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
                                    <th scope="col">Endereço</th>
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
                                        <td>{this.enderecoNull(funcionario)}</td>

                                        <td className="text-center">
                                            <div className="btn-group"> 
                                                <div className="p-1">
                                                    <button className="btn btn-sm btn-info"><i className="bi bi-pencil-square"></i> Editar</button>
                                                </div>
                                                <div className="p-1">
                                                    <button onClick={() => this.deletarFuncionario(funcionario)} className="btn btn-sm btn-danger"><i className="bi bi-trash"></i> Deletar</button>
                                                </div>
                                                <div className="p-1">
                                                    <button onClick={() => this.setState({funcionarioselecionado: funcionario})} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className="btn btn-sm bg-silver"><i className="bi bi-geo-alt"></i> Endereço</button>
                                                    <div>
                                                        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                                                            <div className="offcanvas-header">
                                                                <h5 id="offcanvasRightLabel">Endereço do {this.state.funcionarioselecionado.nome}</h5>
                                                                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                                            </div>
                                                            <hr></hr>

                                                            <div className="offcanvas-body textleft">
                                                                <form className="form-group">
                                                                    <div className="col-10">
                                                                        <label className="form-label">Logradouro</label>
                                                                        <input disabled={this.state.btndisable} value={this.state.logradouro} onChange={this.funcLogradouroChange} type="text" className="form-control" autoFocus></input>
                                                                    </div>
                                                                    <div className="col-5 mt-2">
                                                                        <label className="form-label">Número</label>
                                                                        <input value={this.state.numero} onChange={this.funcNumeroChange} type="number" className="form-control" ></input>
                                                                    </div>
                                                                    <div className="col-12 mt-2">
                                                                        <label className="form-label">Complemento</label>
                                                                        <input value={this.state.complemento} onChange={this.funcComplementoChange} type="text" className="form-control" ></input>
                                                                    </div>
                                                                    <div className="col-7 mt-2">
                                                                        <label className="form-label">Bairro</label>
                                                                        <select value={this.state.bairroselecionado} onChange={this.funcBairroChange} className="form-select">
                                                                            {this.state.bairro && this.state.bairro.map(x => {
                                                                                return <option key={x.id} value={x.id}>{x.nome}</option>
                                                                            })}
                                                                        </select>
                                                                    </div>
                                                                    <div className="col-6 mt-2">
                                                                        <label className="form-label">Cidade</label>
                                                                        <input value={this.state.funcCidadeChange} onChange={this.funcCidadeChange} type="text" className="form-control" ></input>
                                                                    </div>
                                                                    <div className="col-5 mt-2">
                                                                        <label className="form-label">UF</label>
                                                                        <select onChange={this.funcUfChange} value={this.state.ufselecionado} className="form-select">
                                                                            {this.state.uf && this.state.uf.map(opcao => {
                                                                                return <option key={opcao} value={opcao}>{opcao}</option>
                                                                            })}
                                                                        </select>
                                                                    </div>
                                                                    <div className="col-5 mt-2">
                                                                        <label className="form-label">Cep</label>
                                                                        <input value={this.state.cep} onChange={this.funcCepChange} type="text" className="form-control" ></input>
                                                                    </div>
                                                                    <hr></hr>
                                                                    <div className="btn-group">
                                                                        <div className="p-1">
                                                                            <button onClick={() => this.atualizarEndereco(this.state.funcionarioselecionado)} className="btn btn-success">Salvar</button>
                                                                        </div> 
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-1">
                                                    <button className="btn btn-sm btn-warning"><i className="bi bi-phone"></i> Telefone</button>
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