import { Component } from 'react';


export default class Cardapio extends Component{

    state = {
        id: "",
        nome: "",
        valor: "",
        tipoItem: "",
        tempoPreparo: "",
        qtdRefeicao: "",
        itens: [],
        qtdecarrinho: ""
    }

    preencherTabelaItens = () => {
        const url = window.servidor + '/item/'
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({itens: data}))
            .then(()=>{
                console.log(this.state.itens)
            })
    }


    adicionarAoCarrinho = (e) => {

        const url = window.servidor + '/item/carrinho/add/'+e.id

        fetch(url)
            .then(response => response.json())
            .then((data) => {
                this.setState({qtdecarrinho: data})
                sessionStorage.setItem('qtdecarrinho',this.state.qtdecarrinho)
                console.log(this.state.qtdecarrinho)
                window.location.reload()
            })


    }

    componentDidMount(){
        this.preencherTabelaItens()
        
    }


    render(){
        return(
            <div className="row mt-5 mb-5">
                <div>
                    <h2 className="p-3 text-center mt-4">Cardápio</h2>
                </div>
                <div className="mt-5 container">
                    <table className="table table-hover table-responsive table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Valor</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Tempo de Preparo</th>
                                <th scope="col">Quantidade Disponível</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.itens && this.state.itens.map( item => {
                                return <tr key={item.id}>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.nome}</td>
                                    <td>{item.valor}</td>
                                    <td>{item.tipoItem}</td>
                                    <td>{item.tempoPreparo}</td>
                                    <td>{item.qtdRefeicao}</td>
                                    <td className="text-center">
                                            <button onClick={() => this.adicionarAoCarrinho(item)} className="btn btn-sm btn-info"><i className="bi bi-cart-plus"></i> Add</button>
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