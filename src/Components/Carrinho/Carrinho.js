import { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import './CarrinhoCSS.css'



export default class Carrinho extends Component{
    state = {
        auxqtdecarrinho: "",
        itensdocarrinho: [],
        valortotalcarrinho: 0,
        totalitenspedidos: 0,
        frete: "",
        usuario: "",
        tipousuario: "",
        idUsuarioLogado: "",
        checkTipoUsuario: false
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


    funcGetUsuarioLogado = () => {
        var url = window.servidor+'/funcionario/'+this.state.idUsuarioLogado
        console.log(url)
        fetch(url)
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            this.setState({usuario: data})
        })
    }


    

    componentDidMount(){
        this.getCarrinho()
        this.getValorTotal()
        this.funcTotalItensCarrinho()
        this.setState({idUsuarioLogado: sessionStorage.getItem('IdUsuarioLogado'), tipousuario: sessionStorage.getItem('TipoUsuarioLogado')})
        this.funcGetUsuarioLogado()
        
    }


    funcTotalItensCarrinho = () => {
        const url = window.servidor+'/item/carrinho/totalitens'
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({totalitenspedidos: data}))
    }



    funcConfirmPedido =() => {
        if(this.state.tipousuario === 'cliente'){
            toast.error('Delivery Indisponivel. No momento apenas funcionarios podem fazer pedidos.')
        }else if(this.state.tipousuario ==='funcionario'){
            console.log("OK")
            var url = window.servidor+'/item/confirmar/'+this.state.idUsuarioLogado
            var requestOption = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            fetch(url, requestOption)
            .then((response) => {
                if(response.status === 200){
                    toast.success("Pedido confirmado.")
                
                }else{
                    toast.success("Erro durante o processamento do pedido.")

                }
            })


        }else{
            toast.error('Favor logar em uma conta de funcionario.')

        }
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
                    <ToastContainer/>
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
                                </li>
                                <li className="list-group-item">
                                    {/*VALOR TOTAL */}
                                    <h6 className="textoright">{this.funcTotalComFrete(this.state.frete)}</h6>
                                </li>
                            </ul>
                            <div className="btn-group">
                                <div className="p-1">
                                    <button onClick={() => this.funcConfirmPedido()} className="btn btn-primary p-2">Confirmar Pedido</button>
                                </div>
                                <div className="p-1">
                                    <button onClick={() => this.limparCarrinho()} className="btn btn-warning p-2">Limpar Carrinho</button>
                                </div>
                            </div>
                            <div>
                            </div>
                        </div>
                        
                    </div>

                </div>
            </div>
        )
    }
}