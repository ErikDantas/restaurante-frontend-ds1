import { Component } from "react";
import { Link } from "react-router-dom";

export default class Menu extends Component{
    render(){
        return(
            <div className="row fixed-top">
                <nav className="col-12 navbar bg-dark text-white navbar-light">
                    <div>
                        <Link className="navbar-brand text-white p-1" to="/"><i className="bi bi-house"> Página Inicial</i></Link>
                        <Link className="navbar-brand text-white p-1" to="/cardapio">Cardápio</Link>
                        <Link className="navbar-brand text-white p-1" to="/reservas">Reservas</Link>
                        <Link className="navbar-brand text-white p-1" to="/mesa">Mesa</Link>
                        <Link className="navbar-brand text-white p-1" to="/carrinho"><i className="bi bi-cart"></i> 
                            Carrinho (Delivery)                            
                        </Link>
                    </div>


                    <Link className="navbar-brand text-white p-1  " to="/ClienteLoginCadastro">Entrar</Link>
                </nav>
            </div>
        )
    }
}