import React, { Component } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default class GerenciarClientes extends Component{
  state = {
    id: "",
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    clientes: [],
    clienteSelecionado: "",
    alterando: false
  }


  getAllClientes = () => {
    const url = window.servidor + "/cliente/"
    fetch(url)
      .then(response => response.json())
      .then((data) => {
          this.setState({clientes: data})
          console.log(data)
      })
  }

  componentDidMount(){
    this.getAllClientes()
  }

  funcNomeChange = (event) => {
    this.setState({nome: event.target.value})
  }
  funcCpfChange = (event) => {
    this.setState({cpf: event.target.value})
  }
  funcEmailChange = (event) => {
    this.setState({email: event.target.value})
  }
  funcSenhaChange = (event) => {
    this.setState({senha: event.target.value})
  }
  funcClienteSelecionadoChange = (event) => {
    this.setState({clienteSelecionado: event.target.value})
  }

  funcApagaCliente = (cliente) => {

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const url = window.servidor + '/cliente/excluir/' + cliente.id
    console.info(url)
    fetch(url, requestOptions)
      .then(this.getAllClientes())
      .then(() => {
          this.componentDidMount()
      })
      .catch(erro => console.log(erro));
  }

  gravarCliente = () => {
    const dados = {
      "nome": this.state.nome,
      "cpf": this.state.cpf,
      "email": this.state.email,
      "senha": this.state.senha
    }

    const requestOptions = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    };

    const url = window.servidor + '/cliente/incluir/'
      fetch(url, requestOptions)
      .then(response => {
        if(response.status === 200){
          toast.success('Cliente cadastrado com sucesso.')
          this.componentDidMount()
        }else{
          toast.error('Falha durante o cadastro.')
        }
      })
      .catch(erro => console.log(erro));
  }

  iniciarAlterar = (cliente) => {
    this.setState({
      alterando: true,
      id: cliente.id,
      nome: cliente.nome,
      cpf: cliente.cpf,
      email: cliente.email,
      senha: cliente.senha,
      clienteSelecionado: cliente
    })
  }

  alterarCliente = (cliente) => {
    const dados = {
      id: cliente.id,
      nome: cliente.nome,
      cpf: cliente.cpf,
      email: cliente.email,
      senha: cliente.senha
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify(dados)
    };

    const url = window.servidor + "/cliente/alterar/" + cliente.id

    fetch(url, requestOptions)
      .then(this.setState({alterando: false}))
      .then(() => {
        this.componentDidMount()
      })
      .catch(erro => console.log(erro));
  }


  render(){
    return(
      <div className="row mt-5 mb-5">
        <div>
          <h2 className="p-3 text-center mt-4">Gerenciar Clientes</h2>
        </div>
        <div>
          <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-primary">
          <i className="bi bi-person-plus"></i> Adicionar Cliente</button>
          {/* MODAL PARA INSERIR UM NOVO CLIENTE */}
          <div>
            <div className="modal fade"  id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Incluir novo Cliente <i className="bi bi-person-plus"></i> </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  {/* FORMULARIO DO MODAL PARA INSERIR UM NOVO CLIENTE */}
                  <form className="form-group textoright">
                    <div className="col-10">
                      <label className="form-label">Nome</label>
                      <input value={this.state.nome} onChange={this.funcNomeChange}
                      maxLength='50' type="text" className="form-control" autoFocus/>
                    </div>
                    <div className="col-4 mt-2">
                      <label className="form-label">CPF</label>
                      <input minLength="11" maxLength="11" value={this.state.cpf}
                      onChange={this.funcCpfChange} type="text" className="form-control"/>
                    </div>
                    <div className="col-8 mt-2">
                      <label className="form-label">Email</label>
                      <input maxLength='40' value={this.state.email}
                      onChange={this.funcEmailChange} type="text" className="form-control"/>
                    </div>
                    <div className="col-5 mt-2">
                      <label className="form-label">Senha</label>
                      <input required minLength="4" value={this.state.senha} onChange={this.funcSenhaChange}
                      maxLength='20' type="password" className="form-control"/>
                      <small id="emailHelp" className="form-text text-muted">Mínimo de 4 digitos</small>
                    </div>
                  </form>
                </div>
                  {/* Botões */}
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary"
                    onClick={ () => this.getAllClientes() }
                    data-bs-dismiss="modal">Fechar</button>

                    <button type="button" className="btn btn-primary"
                    onClick={ () => this.gravarCliente() }
                    data-bs-dismiss="modal">Salvar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 container">
          <table className="table table-hover table-responsive table-striped">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Nome</th>
                <th scope="col">CPF</th>
                <th scope="col">E-mail</th>
                <th scope="col">Senha</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {this.state.clientes && this.state.clientes.map( cliente => {
                return <tr key={cliente.id}>
                    <th scope="row">{cliente.id}</th>
                    <td>{cliente.nome}</td>
                    <td>{cliente.cpf}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.senha}</td>
                    <td className="text-center">
                      {/* EDITAR CLIENTE */}
                      <div className="btn-group">
                        <div className="p-1">
                          <button className="btn btn-sm btn-info"
                          onClick={() => this.iniciarAlterar(cliente)}
                          data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                          <i className="bi bi-pencil-square"></i> Editar</button>
                          <div>
                            {/* OFF CANVAS ALTERAR CLIENTE */}
                            <div className="offcanvas offcanvas-end" tabIndex="-1"
                            id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                              <div className="offcanvas-header">
                                <h5 id="offcanvasRightLabel">Editar {this.state.clienteSelecionado.nome}</h5>
                                <button type="button" className="btn-close text-reset"
                                data-bs-dismiss="offcanvas" aria-label="Close"></button>
                              </div>
                              <hr></hr>
                              <div className="offcanvas-body textleft">
                                <form className="form-group textoright">
                                  <div className="col-10">
                                    <label className="form-label">Nome</label>
                                    <input value={this.state.nome} onChange={this.funcNomeChange}
                                    maxLength='50' type="text" className="form-control" autoFocus/>
                                  </div>
                                  <div className="col-10 mt-2">
                                    <label className="form-label">CPF</label>
                                    <input minLength="11" maxLength="11" value={this.state.cpf}
                                    onChange={this.funcCpfChange} type="text" className="form-control"/>
                                  </div>
                                  <div className="col-10 mt-2">
                                    <label className="form-label">Email</label>
                                    <input maxLength='40' value={this.state.email}
                                    onChange={this.funcEmailChange} type="text" className="form-control"/>
                                  </div>
                                  <div className="col-5 mt-2">
                                    <label className="form-label">Senha</label>
                                    <input required minLength="4" value={this.state.senha} onChange={this.funcSenhaChange}
                                    maxLength='20' type="password" className="form-control"/>
                                    <small id="emailHelp" className="form-text text-muted">Mínimo de 4 digitos</small>
                                  </div>
                                  <hr></hr>
                                  <div className="btn-group mt-2">
                                    <div className="p-1">
                                      <button onClick={() => this.alterarCliente(this.state)}
                                      className="btn btn-success">Salvar</button>
                                    </div> 
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* APAGAR CLIENTE */}    
                        <div className="p-1">
                          <button className="btn btn-sm btn-danger" onClick={() => this.funcApagaCliente(cliente)}>
                          <i className="bi bi-trash"></i> Deletar</button>
                        </div>
                      </div>
                    </td>
                  </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}