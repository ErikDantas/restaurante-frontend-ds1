import { Component } from "react";



export default class GerenciarClientes extends Component{
    state = {
        nome: "",
        cpf: "",
        email: "",
        senha: "",
        clientes: []
    }


    getAllClientes = () => {
        const url = window.servidor + "/cliente/"
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                this.setState({clientes: data})
                console.log(data)
            })
    }

    componentDidMount(){
        this.getAllClientes()
    }


    render(){
        return(
            <div className="row mt-5 mb-5">
                <div>
                    <h2 className="p-3 text-center mt-4">Gerenciar Clientes</h2>
                </div>
                <div className="mt-5 container">
                    <table className="table table-hover table-responsive table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Cpf</th>
                                <th scope="col">E-mail</th>
                                <th scope="col">Senha</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.clientes && this.state.clientes.map( cliente => {
                                return <tr key={cliente.id}>
                                    <th scope="row">{cliente.id}</th>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.cpf}</td>
                                    <td>{cliente.email}</td>
                                    <td>{cliente.senha}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}