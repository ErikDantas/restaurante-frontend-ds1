import { Component } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import './LayoutCSS.css'

export default class Menu extends Component{

    funcLogoff = () => {
        localStorage.setItem('NomeLogin','null')
    }


    renderUsuarioNaoLogado = () => {
        return (
            <div className="row fixed-top">
                <nav className="col-12 navbar bg-dark text-white navbar-light">
                    <div>
                        <Link className="navbar-brand text-white fontetexto p-1" to="/"><i className="bi bi-house"> Página Inicial</i></Link>
                        <Link className="navbar-brand text-white fontetexto p-1" to="/cardapio">Cardápio</Link>
                        <Link className="navbar-brand text-white fontetexto p-1" to="/reservas">Reservas</Link>
                        <Link className="navbar-brand text-white fontetexto p-1" to="/carrinho"><i className="bi bi-cart"></i> 
                            Carrinho (Delivery)                            
                        </Link>
                    </div>

                    <Link className="navbar-brand text-white p-1  " to="/ClienteLoginCadastro">Entrar</Link>
                </nav>
            </div>
        )
    }


    renderUsuarioLogado = () => {
        return(
            <div className="row fixed-top">
                <ToastContainer/>
                <nav className="col-12 navbar bg-dark text-white navbar-light">
                    <div>
                        <Link className="navbar-brand text-white fontetexto p-1" to="/"><i className="bi bi-house"> Página Inicial</i></Link>
                        <Link className="navbar-brand text-white fontetexto p-1" to="/cardapio">Cardápio</Link>
                        <Link className="navbar-brand text-white fontetexto p-1" to="/reservas">Reservas</Link>
                        <Link className="navbar-brand text-white fontetexto p-1" to="/carrinho"><i className="bi bi-cart"></i> 
                            Carrinho (Delivery)                            
                        </Link>
                    </div>

                    <div className="btn-group dropstart p-1">
                        <button className="btn btn-dark dropdown-toggle fontetexto" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {localStorage.getItem('NomeLogin')}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a className="dropdown-item" href="/">Gerenciar Funcionarios</a></li>
                            <li><a className="dropdown-item" href="/">Gerenciar Clientes</a></li>
                            <li><a className="dropdown-item" href="/funcionarios/GerenciarCardapio">Gerenciar Cardápio</a></li>
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
        if(logado==='null'){
            divRetornar = this.renderUsuarioNaoLogado()
        }else{
            divRetornar = this.renderUsuarioLogado()
        }

        return divRetornar
    }
}