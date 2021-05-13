import { Component } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import './LayoutCSS.css'

export default class Menu extends Component{

    funcLogoff = () => {
        localStorage.setItem('NomeLogin','null')
    }

    componentDidMount(){
        sessionStorage.setItem('qtdecarrinho',0)
      }


    renderUsuarioNaoLogado = () => {
        return (
            <div className="row fixed-top">
                <nav className="col-12 navbar bg-ds1-primary text-white navbar-light">
                    <div>
                        <Link className="navbar-brand text-white fontetexto p-1" to="/"><i className="bi bi-house"> Página Inicial</i></Link>
                        <Link className="navbar-brand text-white fontetexto p-1" to="/Cardapio">Cardápio</Link>
                        <Link className="navbar-brand text-white fontetexto p-1" to="/Reservas">Reservas</Link>
                        <Link className="navbar-brand text-white fontetexto p-1" to="/Carrinho"><i className="bi bi-cart"></i>
                            Carrinho (Delivery)                            
                        </Link>
                    </div>

                    <Link className="navbar-brand text-white p-1  " to="/ClienteLoginCadastro">Entrar</Link>
                </nav>
            </div>
        )
    }


    renderUsuarioLogadoFunc = () => {
        return(
            <div className="row fixed-top">
                <ToastContainer/>
                <nav className="col-12 navbar bg-ds1-primary text-white navbar-light">
                    <div>
                        <Link className="navbar-brand text-white fontetexto p-1" to="/"><i className="bi bi-house"> Página Inicial</i></Link>
                        <Link className="navbar-brand text-white fontetexto p-1" to="/Cardapio">Cardápio</Link>
                        <Link className="navbar-brand text-white fontetexto p-1" to="/Reservas">Reservas</Link>
                        
                        <Link className="navbar-brand text-white fontetexto p-1" to="/AdicionarItem">Cadastrar Item</Link>
                    </div>

                    <div className="btn-group dropstart p-1">
                        <button className="btn bg-ds1-primary text-white dropdown-toggle fontetexto" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {localStorage.getItem('NomeLogin')}
                        </button>
                        <Link className="navbar-brand text-white p-1" to="/Carrinho"><i className="bi bi-cart"></i><span className="badge bg-primary p-1">{sessionStorage.getItem('qtdecarrinho')}</span>
                        <span className="visually-hidden">unread messages</span> </Link>

                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a className="dropdown-item" href="/funcionarios/GerenciarFuncionarios">Gerenciar Funcionarios</a></li>
                            <li><a className="dropdown-item" href="/Clientes/GerenciarClientes">Gerenciar Clientes</a></li>
                            <li><a className="dropdown-item" href="/gerenciarcardapio">Gerenciar Cardápio</a></li>
                            <li><a className="dropdown-item" href="/mesa">Gerenciar Mesas</a></li>
                            <li><hr className="dropdown-divider"/></li>
                            <li><a className="dropdown-item" onClick={this.funcLogoff} href="/ClienteLoginCadastro">Logout</a></li>
                        </ul>
                        </div>
                </nav>
            </div>
        )
    }


    renderUsuarioLogadoClient = () => {
        return(
            <div className="row fixed-top">
                <ToastContainer/>
                <nav className="col-12 navbar bg-ds1-primary text-white navbar-light">
                    <div>
                        <Link className="navbar-brand text-white fontetexto p-1" to="/"><i className="bi bi-house"> Página Inicial</i></Link>
                        <Link className="navbar-brand text-white fontetexto p-1" to="/cardapio">Cardápio</Link>
                        <Link className="navbar-brand text-white fontetexto p-1" to="/reservas">Reservas</Link>
                        <Link className="navbar-brand text-white fontetexto p-1" to="/carrinho"><i className="bi bi-cart"></i> 
                            Carrinho (Delivery)                            
                        </Link>
                    </div>

                    <div className="btn-group dropstart p-1">
                        <button className="btn bg-ds1-primary text-white dropdown-toggle fontetexto" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {localStorage.getItem('NomeLogin')}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><hr className="dropdown-divider"/></li>
                            <li><a className="dropdown-item" onClick={this.funcLogoff} href="/ClienteLoginCadastro">Logout</a></li>
                        </ul>
                        </div>
                </nav>
            </div>
        )
    }


    

    render(){
        let divRetornar = ''
        let logado = localStorage.getItem('NomeLogin')
        let tipologin = localStorage.getItem('TipoDeLogin')
        if(logado==='null'){
            divRetornar = this.renderUsuarioNaoLogado()
        }else{
            if(tipologin ==='cliente'){
                divRetornar = this.renderUsuarioLogadoClient()
            }else{
                divRetornar = this.renderUsuarioLogadoFunc()
            }
        }

        return divRetornar
    }
}