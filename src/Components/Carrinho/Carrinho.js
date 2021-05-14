import { Component } from "react";



export default class Carrinho extends Component{
    state = {
        auxqtdecarrinho: "",
        itensdocarrinho: [],
        valortotalcarrinho: 0
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


    componentDidMount(){
        this.getCarrinho()
        
    }



    render(){

        return(
            <div className="mt-5">
                <button onClick={() => this.limparCarrinho()} className="btn btn-primary mt-5">Limpar Carrinho</button>
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
                                        <td><button className="btn"><i className="bi bi-bag-dash p-2"></i></button>{item[4]}<button className="btn"><i className="bi bi-bag-plus p-2"></i></button></td>
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
                                    Quantidade de Itens pedidos
                                    <p>Valor do Frete</p>
                                </li>
                                <li className="list-group-item">
                                    <h4>Valor Total:
                                        
                                    </h4>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}