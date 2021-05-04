import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Cardapio from './Components/Cardapio/Cardapio';
import Carrinho from './Components/Carrinho/Carrinho';
import Cliente from './Components/Layout/LoginCadastro';
import Footer from './Components/Layout/Footer';
import Home from './Components/Layout/Home';
import Menu from './Components/Layout/Menu';
import Mesa from './Components/Mesa/Mesa';
import Reserva from './Components/Reserva/Reserva';
import GerenciarCardapio from './Components/Funcionario/GerenciarCardapio';
<<<<<<< HEAD
import GerenciarFuncionarios from './Components/Funcionario/GerenciarFuncionarios';
=======
import AdicionarItem from './Components/Funcionario/AdicionarItem';
>>>>>>> origin/alunos

export default class App extends Component{
  render(){
    return (
      <BrowserRouter>
        <div className="container">
        <Menu/>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="/Cardapio">
              <Cardapio/>
            </Route>
            <Route path="/ClienteLoginCadastro">
              <Cliente/>
            </Route>
            <Route path="/Reservas">
              <Reserva/>
            </Route>
            <Route path="/Carrinho">
              <Carrinho/>
            </Route>
            <Route path="/Mesa">
              <Mesa/>
            </Route>
            <Route path="/GerenciarCardapio">
              <GerenciarCardapio/>
            </Route>
<<<<<<< HEAD
            <Route path="/funcionarios/GerenciarFuncionarios">
              <GerenciarFuncionarios/>
=======
            <Route path="/AdicionarItem">
              <AdicionarItem/>
>>>>>>> origin/alunos
            </Route>
          </Switch>
          <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}
