import { Component } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default class Menu extends Component{




    renderUsuarioNaoLogado = () => {
        return (
            <div className="row fixed-top">
                <nav className="col-12 navbar bg-dark text-white navbar-light">
                    <div>
                        <Link className="navbar-brand text-white p-1" to="/"><i className="bi bi-house"> Página Inicial</i></Link>
                        <Link className="navbar-brand text-white p-1" to="/cardapio">Cardápio</Link>
                        <Link className="navbar-brand text-white p-1" to="/reservas">Reservas</Link>
                        <Link className="navbar-brand text-white p-1" to="/carrinho"><i className="bi bi-cart"></i> 
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
                        <Link className="navbar-brand text-white p-1" to="/"><i className="bi bi-house"> Página Inicial</i></Link>
                        <Link className="navbar-brand text-white p-1" to="/cardapio">Cardápio</Link>
                        <Link className="navbar-brand text-white p-1" to="/reservas">Reservas</Link>
                        <Link className="navbar-brand text-white p-1" to="/carrinho"><i className="bi bi-cart"></i> 
                            Carrinho (Delivery)                            
                        </Link>
                    </div>

                    <Link className="navbar-brand text-white p-1  " to="/ClienteLoginCadastro">{localStorage.getItem('NomeLogin')}</Link>
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