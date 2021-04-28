import { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import {cpf} from 'cpf-cnpj-validator';


toast.configure()
export default class ClienteLoginCadastro extends Component{

    

    state = {
        id: "",
        nome: "",
        cpf: "",
        email: "",
        senha: "",
        senha2: "",
        telefone: ""
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
    funcSenha2Change = (event) => {
        this.setState({senha2: event.target.value})
    }
    funcTelefoneChange = (event) => {
        this.setState({telefone: event.target.value})
    }

    efetuarLogin = () => {
        const flogin = {
            "login":this.state.email,
            "senha":this.state.senha
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(flogin)
        }

        const url = window.servidor + '/funcionario/login'
        fetch(url,requestOptions)
            .then(response => {
                console.log(response.status)

            })

            
            

    }

    gravarCliente = () => {
        if(this.state.senha === this.state.senha2){
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
                }

                const url = window.servidor + '/cliente/incluir/'
                    fetch(url, requestOptions)
                    .then(response => {
                        if(response.status === 200){
                            toast.success('Cliente Cadastrado com sucesso.')
                        }else{
                            toast.error('Falha durante o cadastro.')
                        }
                    })
            
            
        }else{
            toast.error('As senhas inseridas não conferem. ');
        }
        
    }



    render(){
        return(
            <div className="mt-5 p-3 row">
                <div className="col-4 mt-2 container-fluid">
                    <div className="accordion" id="accordionLogin">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Login
                            </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionLogin">
                                <div className="accordion-body mt-3">
                                    <form>
                                        <div className="form-group mb-3">
                                            <label>Email</label>
                                            <input type="email" className="form-control" id="InputEmail1" aria-describedby="emailHelplogin" placeholder="Enter email"/>
                                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input type="password" className="form-control" id="exampleInputPasswordLogin" placeholder="Password"/>
                                        </div>
                                        <div className="p-3">
                                            <Link to="/PasswordForget">
                                                Esqueci minha senha
                                            </Link>
                                        </div>
                                        <div className="p-3 text-center">
                                            <button type="button" onClick={this.efetuarLogin} className="btn btn-success">Entrar</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Cadastrar
                            </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionLogin">
                                <div className="accordion-body">
                                    <form>
                                        <div className="form-group mb-3">
                                            <label>Nome</label>
                                            <input type="text" value={this.state.nome} onChange={this.funcNomeChange} className="form-control" id="inputnome" aria-describedby="emailHelp" placeholder="Digite seu nome completo"/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>CPF</label>
                                            <input maxLength="11" type="text" value={this.state.cpf} onChange={this.funcCpfChange} className="form-control" id="inputCPF" aria-describedby="cpfHelp" placeholder="Digite seu CPF"/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Email</label>
                                            <input type="email" value={this.state.email} onChange={this.funcEmailChange} className="form-control" id="InputEmailRegistration" aria-describedby="emailHelp" placeholder="Digite seu email"/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Telefone</label>
                                            <input maxLength="11" className="form-control" value={this.state.telefone} onChange={this.funcTelefoneChange} type="tel" placeholder="Insira seu telefone"/>

                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Senha</label>
                                            <input type="password" value={this.state.senha} onChange={this.funcSenhaChange} className="form-control" id="exampleInputPassword1" placeholder="Insira uma senha"/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Repetir Senha</label>
                                            <input type="password" value={this.state.senha2} onChange={this.funcSenha2Change} className="form-control" id="RepetirInputPassword" placeholder="Insira novamente a senha"/>
                                        </div>
                                        <div className="p-3 text-center">
                                            <button type="button" onClick={this.gravarCliente} className="btn btn-success">Salvar</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}