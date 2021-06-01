import { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import "./FuncionarioCSS.css"



export default class Bairros extends Component{
    state = {
        bairros: [],
        nome: "",
        valorfrete: "",
        bairrocadastrado: "",
        alterar: false,
        id: ""
    }

    funcLimpaState = () => {
        this.setState({alterar: false})
        this.setState({nome: ""})
        this.setState({valorfrete: ""})
        this.setState({id: ""})
    }

    funcNomeChange = (event) => {
        this.setState({nome: event.target.value})
    }
    funcFreteChange = (event) => {
        this.setState({valorfrete: event.target.value})
    }

    funcAddNovoBairro = () => {
        const bairro = {
            nome: this.state.nome,
            valorFrete: this.state.valorfrete
        };

        if(this.state.alterar === false){
            const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bairro)
            };

            const url = window.servidor+'/bairro/incluir'
            fetch(url,requestOptions)
                .then((response) => {
                    if(response.status===200){
                        toast.success("Bairro cadastrado.")
                        this.funcGetAllBairros()
                        this.funcLimpaState()

                    }else{
                        toast.error("Falha ao cadastrar bairro.")
                    }
                })
        }else{    
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bairro)
            };
            const url = window.servidor+'/bairro/alterar/'+this.state.id
            fetch(url,requestOptions)
                .then((response) => {
                    if(response.status===200){
                        toast.success("Alterado com sucesso.")
                        this.funcLimpaState()
                        this.funcGetAllBairros()
                    }
                })
        }
        
    }

    funcGetAllBairros = () => {
        const url = window.servidor+"/bairro/"
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({bairros: data}))
    }

    funcExcluirBairro = (bairro) => {
        const url = window.servidor+"/bairro/excluir/"+bairro.id
        
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch(url,requestOptions)
            .then((response) => {
                if(response.status===200){
                    this.funcGetAllBairros()
                }
            })
    }


    componentDidMount(){
        this.funcGetAllBairros()
    }

    funcAlterarBairro = (x) => {
        this.setState({alterar: true})
        this.setState({nome: x.nome})
        this.setState({valorfrete: x.valorFrete})
        this.setState({id: x.id})
        
    }

    render(){
        return(
            <div className="mt-5 p-4">
                <ToastContainer/>
                <h3 className="text-center">Cadastro de Bairros</h3>
                <div className="row g-3 mt-5">
                    <div className="col-sm-7">
                        <label>Nome</label>
                        <input value={this.state.nome} onChange={this.funcNomeChange} type="text" className="form-control" placeholder="Nome" aria-label="Nome"/>
                    </div>
                    <div className="col-sm">
                        <label>Valor</label>
                        <input value={this.state.valorfrete} onChange={this.funcFreteChange} type="text" className="form-control" placeholder="Valor" aria-label="Valor"/>
                    </div>
                        <button onClick={() => this.funcAddNovoBairro()} className="btn btn-success">Salvar</button>
                    
                </div>
                <div className="row mt-5 mb-5 col-8">
                    <table className="mt-5 table table-hover table-responsive-sm">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Valor Frete</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.bairros && this.state.bairros.map(bairro => {
                                return <tr key={bairro.id}>
                                    <th scope="row">{bairro.id}</th>
                                    <td>{bairro.nome}</td>
                                    <td>{bairro.valorFrete}</td>
                                    <td className="textoright">
                                        <div className="btn-group">
                                            <div className="p-1">
                                                <button onClick={() => this.funcAlterarBairro(bairro)} className="btn btn-sm btn-info"><i className="bi bi-pencil-square"></i> Editar</button>
                                            </div>
                                            <div className="p-1">
                                                <button onClick={() => this.funcExcluirBairro(bairro)} className="btn btn-sm btn-danger"><i className="bi bi-trash"></i> Excluir</button>
                                            </div>
                                        </div>
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