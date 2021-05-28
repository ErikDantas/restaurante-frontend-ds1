import { Component } from "react";
import './CarrinhoCSS.css'



export default class Carrinho extends Component{
    state = {
        auxqtdecarrinho: "",
        itensdocarrinho: [],
        valortotalcarrinho: 0,
        totalitenspedidos: 0,
        frete: "",
        usuario: ""
    }

    funcAcumularQuantidadeItens = (x) => {

        return <div>
                    <button onClick={()=>this.removerDoCarrinho(x[0])} className="btn"><i className="bi bi-bag-dash p-2"></i></button>{x[4]}<button onClick={() => this.adicionarAoCarrinho(x[0])} className="btn"><i className="bi bi-bag-plus p-2"></i></button>
            </div>
    }

    limparCarrinho = () => {
        const url = window.servidor + '/item/carrinho/limpar'
        fetch(url)
        .then(response => response.json())
        .then((data) => {
            this.setState({auxqtdecarrinho: data})
            sessionStorage.setItem('qtdecarrinho',this.state.auxqtdecarrinho)
            window.location.reload()
        })
    }



    getCarrinho = () => {
        const url = window.servidor + '/item/carrinho'
        fetch(url)
        .then(response => response.json())
        .then((data) => {
            this.setState({itensdocarrinho: data})
        })
    }


    getValorTotal = () => {

        const urlvalortotal = window.servidor + '/item/carrinho/valortotal'

        fetch(urlvalortotal)
        .then(response => response.json())
        .then(data => this.setState({valortotalcarrinho: data}))
    }


    

    componentDidMount(){
        this.getCarrinho()
        this.getValorTotal()
        this.funcTotalItensCarrinho()
        this.funcGetValorFrete()
    }


    funcTotalItensCarrinho = () => {
        const url = window.servidor+'/item/carrinho/totalitens'
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({totalitenspedidos: data}))
    }


    adicionarAoCarrinho = (e) => {

        const url = window.servidor + '/item/carrinho/add/'+e
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                this.setState({qtdecarrinho: data})
                sessionStorage.setItem('qtdecarrinho',this.state.qtdecarrinho)
                window.location.reload()
            })
            

    }
    removerDoCarrinho = (e) => {

        const url = window.servidor + '/item/carrinho/remover/'+e
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                this.setState({qtdecarrinho: data})
                sessionStorage.setItem('qtdecarrinho',this.state.qtdecarrinho)
                window.location.reload()
            })
    }


    funcGetValorFrete = () => {
        if(localStorage.getItem('TipoUsuarioLogado')==='cliente'){
            const idcliente = localStorage.getItem('IdUsuarioLogado')
            const url = window.servidor+'/cliente/'+idcliente

            fetch(url)
                .then(response => response.json())
                .then(data => this.setState({usuario: data}))
        }else if(localStorage.getItem('TipoUsuarioLogado')==='funcionario'){
            const matriculafuncionario = localStorage.getItem('IdUsuarioLogado')
            const url = window.servidor+'/funcionario/'+matriculafuncionario

            fetch(url)
                .then(response => response.json())
                .then(data => this.setState({usuario: data}))
        }
    }

    funcValorFreteIsNull = (x) => {
        if(x===null){
            return <div>Bairro não cadastrado.</div>
        }else{
            return <div>Frete: {(x).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>
        }
    }

    funcTotalComFrete = (x) => {
        if(x===null){
            return <div>Favor cadastrar o bairro.</div>
        }else{
            return <div>Total: {(this.state.valortotalcarrinho).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>
        }
    }

    render(){

        return(
            <div className="mt-5">
                <div>
                    <h2 className="p-3 text-center">Carrinho</h2>
                </div>
                <div className="row mt-5 mb-5 col-12">
                    
                    <div className="mt-5 col-9">
                        <table className="table table-hover table-responsive table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">Valor Unitário</th>
                                    <th scope="col">Quantidade</th>
                                    <th scope="col">Valor Total</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.itensdocarrinho && this.state.itensdocarrinho.map( item => {
                                    return <tr key={item[0]}>
                                        <th scope="row">{item[0]}</th>
                                        <td>{item[1]}</td>
                                        <td>{item[2]}</td>
                                        <td>{parseFloat(item[3]).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
                                        <td>{this.funcAcumularQuantidadeItens(item)}</td>
                                        <td>{(item[3]*item[4]).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                        
                    </div>
                    <div className="col-3">
                        <div className="card">
                            <div className="card-header">
                                Resumo do Pedido
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    {/* TOTAL + QUANTIDADE DE PRODUTOS*/}
                                    {this.state.totalitenspedidos} produtos x  {" "+(this.state.valortotalcarrinho).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                                     {/*FRETE TOTAL */}
                                    {this.funcValorFreteIsNull(this.state.frete)}
                                </li>
                                <li className="list-group-item">
                                    {/*VALOR TOTAL */}
                                    <h6 className="textoright">{this.funcTotalComFrete(this.state.frete)}</h6>
                                </li>
                            </ul>
                            <div className="btn-group">
                                <div className="p-1">
                                    <button className="btn btn-primary p-2">Confirmar Pedido</button>
                                </div>
                                <div className="p-1">
                                    <button onClick={() => this.limparCarrinho()} className="btn btn-warning p-2">Limpar Carrinho</button>
                                </div>
                            </div>
                            

                        </div>
                        
                    </div>

                </div>
            </div>
        )
    }
}