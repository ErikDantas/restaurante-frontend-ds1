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
        idendereco: 0,
        funcionarioselecionado: "",
        rendereditar: 0,
        telarender: "1",
        telefone: ""
    }


    gerenteIsNull = (x) => {
        if(x.gerente===null){
            return <div>False</div>
        }else{
            return <div>{(x.gerente).toString()}</div>
        }
    }


    enderecoNull = (x) => 
    {
        if(x.endereco===null){
            return <div> - </div>
        }else{
            return <div>{(x.endereco.logradouro)+" / Nº "+(x.endereco.numero)}</div>
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

    funcTelefoneChange = (event) => {
        this.setState({telefone: event.target.value})
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
            email: this.state.email,
            telefone: this.state.telefone
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
            .then((response) => {
                if(response.status===200){
                    this.preencherTabelaFuncionarios()
                    toast.success("Adicionado com sucesso.")
                    this.setState({telarender: '1'})
                }
            })
        }else{
            toast.error("Preencha todos os campos.")
        }
        
    }

    deletarFuncionario = (x) => {
        const url = window.servidor + '/funcionario/excluir/'+x.matricula

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


    atualizarEndereco = () => {
        if(this.state.funcionarioselecionado.endereco === null){
            const dados = {
                logradouro: this.state.logradouro,
                numero: this.state.numero,
                complemento: this.state.complemento,
                bairro: {
                    id: this.state.bairroselecionado
                },
                cidade: this.state.cidade,
                uf: this.state.ufselecionado,
                cep: this.state.cep
            };

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
                    .then(data => this.setState({idendereco: data}))
                    .then(() => {
                        if(this.state.idendereco >0){
                            this.atualizarEnderecoFuncionario();
                        }
                    })
        }else{
            const dados = {
                logradouro: this.state.logradouro,
                numero: this.state.numero,
                complemento: this.state.complemento,
                bairro: {
                    id: this.state.bairroselecionado
                },
                cidade: this.state.cidade,
                uf: this.state.ufselecionado,
                cep: this.state.cep
            };

            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            };

            const url = window.servidor + "/endereco/alterar/"+this.state.funcionarioselecionado.endereco.id
            fetch(url,requestOptions)
                .then((response) => {
                    console.log(response.status)
                    this.setState({telarender: '1'})
                    this.preencherTabelaFuncionarios()
                })
        }

    }

    atualizarEnderecoFuncionario(){
        const aux ={
            nome: this.state.funcionarioselecionado.nome,
            cargo: this.state.funcionarioselecionado.cargo,
            login: this.state.funcionarioselecionado.login,
            senha: this.state.funcionarioselecionado.senha,
            gerente: this.state.funcionarioselecionado.gerente,
            cpf: this.state.funcionarioselecionado.cpf,
            endereco: {
                id: this.state.idendereco
            },
            email: this.state.funcionarioselecionado.email,
            telefone: this.state.funcionarioselecionado.telefone

        }
        const rOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(aux)
        };

        const url = window.servidor+'/funcionario/alterar/'+this.state.funcionarioselecionado.matricula
        fetch(url,rOptions)
            .then((response) => {
                response.json()
                console.log(response.status)
                if(response.status===200){
                    toast.success("Endereço atualizado.")
                    this.setState({telarender: '1'})
                    this.preencherTabelaFuncionarios()
                }else{
                    toast.error("Falha ao atualizar endereço.")
                }
            })
    
        this.setState({logradouro: "", numero: "", cep: "", cidade: "", complemento: ""});
    }


    funcAlterarRenderEndereco = (f) => {
        this.setState({funcionarioselecionado: f})
        this.setState({telarender: 3})
        if(f.endereco === null){

        }else{
            this.setState({logradouro: f.endereco.logradouro})
            this.setState({numero: f.endereco.numero})
            this.setState({complemento: f.endereco.complemento})
            this.setState({bairroselecionado: f.endereco.bairro.id})
            this.setState({cidade: f.endereco.cidade})
            this.setState({ufselecionado: f.endereco.uf})
            this.setState({cep: f.endereco.cep})

        }
    }


    funcEditarFuncionarioRender = (f) => {
        this.setState({funcionarioselecionado: f})
        this.setState({telarender: 2})
        this.setState({rendereditar: 0})
        if(f===null){

        }else{
            this.setState({nome: f.nome})
            this.setState({cargo: f.cargo})
            this.setState({login: f.login})
            this.setState({senha: f.senha})
            this.setState({cpf: f.cpf})
            this.setState({email: f.email})
            this.setState({gerente: f.gerente})
            this.setState({telefone: f.telefone})
        }
        
    }

    funcAtualizarFuncionario = () => {
        if(this.state.funcionarioselecionado.endereco===null){
            const aux ={
                nome: this.state.nome,
                cargo: this.state.cargo,
                login: this.state.login,
                senha: this.state.senha,
                gerente: this.state.gerente,
                cpf: this.state.cpf,
                telefone: this.state.telefone,
                email: this.state.email
            }
            const rOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(aux)
            };
            const url = window.servidor + '/funcionario/alterar/'+this.state.funcionarioselecionado.matricula
            fetch(url,rOptions)
                .then((response) => {
                    response.json()
                    if(response.status===200){
                        toast.success("Alterado com sucesso. Código= "+response.status)
                        this.setState({telarender: '1'})
                        this.preencherTabelaFuncionarios()
                    }else{
                        toast.error("Falha ao alterar.")
                    }
                })
        }else{
            const aux ={
                nome: this.state.nome,
                cargo: this.state.cargo,
                login: this.state.login,
                senha: this.state.senha,
                gerente: this.state.gerente,
                cpf: this.state.cpf,
                endereco: {
                    id: this.state.funcionarioselecionado.endereco.id
                },
                telefone: this.state.telefone,
                email: this.state.email
            }
            const rOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(aux)
            };
            const url = window.servidor + '/funcionario/alterar/'+this.state.funcionarioselecionado.matricula
            fetch(url,rOptions)
                .then((response) => {
                    response.json()
                    if(response.status===200){
                        toast.success("Alterado com sucesso. Código= "+response.status)
                        this.setState({telarender: '1'})
                        this.preencherTabelaFuncionarios()
                    }else{
                        toast.error("Falha ao alterar.")
                    }
                })
        }
        
       
    }



    funcEscolherEditarSalvar = (f) => {
        if(this.state.rendereditar===0){
            this.funcAtualizarFuncionario(f)
        }else{
            this.gravarNovoFuncionario();
        }
    }


    funcLimparInputsNovoFuncionario = () => {
        this.setState({telarender: 2, rendereditar: 1})
        this.setState({
            nome: "",
            cargo: "",
            login: "",
            senha: "",
            cpf: "",
            email: "",
            telefone: ""
        })
    }

    renderTabelaFuncionarios = () => {
        return(
            <div className="mt-5 row mb-5">
                <div>
                    <h5 className="mt-5 text-center">Funcionarios Cadastrados</h5>
                </div>
                <div>
                    <button type="button" onClick={() => this.funcLimparInputsNovoFuncionario()} className="btn btn-primary"><i className="bi bi-person-plus"></i> Adicionar Funcionário</button>
                </div>
                <div className="mt-3 col-12">
                    <div className="mt-5">
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
                                    <th scope="col">Telefone</th>
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
                                        <td>{this.gerenteIsNull(funcionario)}</td>
                                        <td>{funcionario.cpf}</td>
                                        <td>{funcionario.email}</td>
                                        <td>{this.enderecoNull(funcionario)}</td>
                                        <td>{funcionario.telefone}</td>
                                        <td className="text-center">
                                            <div className="btn-group"> 
                                                <div className="p-1">
                                                    <button onClick={() => this.funcEditarFuncionarioRender(funcionario)} className="btn btn-sm btn-info"><i className="bi bi-pencil-square"></i> Editar</button>
                                                </div>
                                                <div className="p-1">
                                                    <button onClick={() => this.setState({funcionarioselecionado: funcionario}) } data-bs-toggle="modal" data-bs-target="#excluirfunc" className="btn btn-sm btn-danger"><i className="bi bi-trash"></i> Deletar</button>
                                                    {/* MODAL PARA EXCLUIR FUNCIONÁRIO*/}
                                                    <div className="modal fade" id="excluirfunc" tabIndex="-1" aria-labelledby="excluirfuncLabel" aria-hidden="true">
                                                        <div className="modal-dialog">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title" id="excluirfuncLabel">Excluir - {this.state.funcionarioselecionado.nome}</h5>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    Deseja realmente excluir o funcionário abaixo?
                                                                    <p>Matricula: {this.state.funcionarioselecionado.matricula}</p>
                                                                            <p>Nome: {this.state.funcionarioselecionado.nome}</p>
                                                                                <p>Cargo: {this.state.funcionarioselecionado.cargo}</p>
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                    <button onClick={() => this.deletarFuncionario(this.state.funcionarioselecionado)} data-bs-dismiss="modal" type="button" className="btn btn-primary">Save changes</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-1">
                                                    <button onClick={() => this.funcAlterarRenderEndereco(funcionario)} className="btn btn-sm bg-silver"><i className="bi bi-geo-alt"></i> Endereço</button>
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


    renderIncluirNovoFuncionario = () => {
        return (
            <div className="row mt-5 mb-5 ">
                <ToastContainer/>
                <div>
                    <h2 className="p-3 text-center mt-4">Gerenciar Funcionários</h2>
                </div>
                <div>
                    <form className="form-group buttonleft">
                        <div className="col-6">
                            <label className="form-label buttonleft">Nome</label>
                            <input value={this.state.nome} onChange={this.funcNomeChange} maxLength='50' type="text" className="form-control" autoFocus></input>
                        </div>
                        <div className="col-3 mt-2">
                            <label className="form-label buttonleft">Cargo</label>
                            <input value={this.state.cargo} onChange={this.funcCargoChange} maxLength='30' type="text" className="form-control" ></input>
                        </div>
                        <div className="col-2 mt-2">
                            <label className="form-label">Login</label>
                            <input value={this.state.login} onChange={this.funcLoginChange} maxLength='10' type="text" className="form-control" ></input>
                        </div>
                        <div className="col-3 mt-2">
                            <label className="form-label">Senha</label>
                            <input required minLength="4" value={this.state.senha} onChange={this.funcSenhaChange} maxLength='20' type="password" className="form-control" ></input>
                            <small id="emailHelp" className="form-text text-muted">Mínimo de 4 digitos</small>
                        </div>
                        <div className="col-2 mt-2">
                            <label className="form-label">CPF</label>
                            <input minLength="11" maxLength="11" value={this.state.cpf} onChange={this.funcCpfChange} type="text" className="form-control" />
                        </div>
                        <div className="col-5 mt-2">
                            <label className="form-label">Email</label>
                            <input maxLength='40' value={this.state.email} onChange={this.funcEmailChange} type="text" className="form-control" ></input>
                        </div>
                        <div className="col-2 mt-2">
                            <label className="form-label">Telefone</label>
                            <input maxLength='11' value={this.state.telefone} onChange={this.funcTelefoneChange} type="text" className="form-control" ></input>
                        </div>
                        <div className="form-check col-5 mt-2">
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Gerente?
                            </label>
                            <input className="form-check-input" type="checkbox" onChange={this.funcGerenteChange} value={this.state.gerente} id="flexCheckDefault"/>
                            
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" onClick={() => this.setState({telarender: '1'})} className="btn btn-secondary">Cancelar</button>
                    <button type="button" onClick={() => this.funcEscolherEditarSalvar()} className="btn btn-primary">Salvar</button>
                </div>
            </div>
        )
    }

    renderAtualizarFuncionario = () => {
        return(
            <div className="mt-5 mb-5">
                <div className="p-5">
                    <h5 className="text-center">Atualizar Endereço</h5>
                </div>
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
                        <input required value={this.state.complemento} onChange={this.funcComplementoChange} type="text" className="form-control" ></input>
                    </div>
                    <div className="col-7 mt-2">
                        <label className="form-label">Bairro</label>
                        <select required value={this.state.bairroselecionado} onChange={this.funcBairroChange} className="form-select">
                            <option>Selecione....</option>
                            {this.state.bairro && this.state.bairro.map(x => {
                                return <option key={x.id} value={x.id}>{x.nome}</option>
                            })}
                        </select>
                    </div>
                    <div className="col-6 mt-2">
                        <label className="form-label">Cidade</label>
                        <input required value={this.state.cidade} onChange={this.funcCidadeChange} type="text" className="form-control" ></input>
                    </div>
                    <div className="col-5 mt-2">
                        <label className="form-label">UF</label>
                        <select required onChange={this.funcUfChange} value={this.state.ufselecionado} className="form-select">
                            <option>Selecione....</option>
                            {this.state.uf && this.state.uf.map(opcao => {
                                return <option key={opcao} value={opcao}>{opcao}</option>
                            })}
                        </select>
                    </div>
                    <div className="col-5 mt-2">
                        <label className="form-label">Cep</label>
                        <input required value={this.state.cep} onChange={this.funcCepChange} type="text" className="form-control" ></input>
                    </div>
                    <hr></hr>
                    
                </form>
                <div className="btn-group">
                        <div className="p-1">
                            <button onClick={() => this.atualizarEndereco()} className="btn btn-success">Salvar</button>
                        </div> 
                        <div className="p-1">
                            <button onClick={() => this.setState({telarender: '1'})} className="btn btn-secondary">Cancelar</button>
                        </div> 
                    </div>
            </div>
        )
    }

    render(){
        let tela
        if(this.state.telarender === '1'){
            tela = this.renderTabelaFuncionarios()
        }else if(this.state.telarender===2){
            tela = this.renderIncluirNovoFuncionario()
        }else{
            tela = this.renderAtualizarFuncionario()
        }
        return(
            tela
        )
    }
}