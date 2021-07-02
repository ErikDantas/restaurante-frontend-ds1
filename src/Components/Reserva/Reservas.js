import { Component } from "react";
import { toast,ToastContainer } from "react-toastify";


export default class Reservas extends Component{
    state = {
        dataHoraReserva: "",
        qtdLugares: "",
        nomeUsuario: "",
        telefone:"",
        reservas: [],
        alterarrender: 1,
        clientes: [],
        reservaselecionada: "",
        statusselecionado:"",
        statusreserva: ""
    }



    funcStatusAlterar = (event) => {
        this.setState({statusselecionado: event.target.value})
    }



    funcGetAllClientes = () => {
        var url = window.servidor+"/cliente/"

        fetch(url)
        .then(response => response.json())
        .then(data => this.setState({clientes: data}))
    }

    


    funcGetAllReservas = () => {
        var url = window.servidor+"/reserva/"

        fetch(url)
        .then(response => response.json())
        .then(data => this.setState({reservas: data}))
        .finally(() => {
            console.log(this.state.reservas)
        })
    }

    funcAlterarTela = (obj) => {
        if(this.state.alterarrender === 1){
            this.setState({alterarrender: 2})
            this.setState({reservaselecionada: obj})
        }else{
            this.setState({alterarrender: 1})
        }
    }


    componentDidMount(){
        this.funcGetAllReservas();
        this.funcGetAllClientes();
    }



    funcAlterarReserva = () => {
        if(this.state.statusselecionado !== ""){
            
            var dados= this.state.statusselecionado;
            
            var requestOption = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            }

            var url = window.servidor+"/reserva/alterar/"+this.state.reservaselecionada.id

            fetch(url,requestOption)
                .then((response) => {
                    if(response.status===200){
                        toast.success("Alterado com sucesso.")
                        this.setState({alterarrender: 1})
                        this.funcGetAllReservas()
                    }
                })
        }else{
            toast.error("Não pode ter campos vazios.")
        }    

    }

    renderTabela = () => {
        return(
            <div className="mt-5 p-5">
                <ToastContainer/>
                <h3 className="text-center">Historico de Reservas</h3>
                <div className="row mt-5 mb-5 col-12">
                    <table className="mt-5 table table-hover table-responsive">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Data e Hora</th>
                                <th scope="col">Nome do Cliente</th>
                                <th scope="col">Telefone</th>
                                <th scope="col">Quantidade de Lugares</th>
                                <th scope="col">Mesa</th>
                                <th scope="col">Prazo para Expiração</th>
                                <th scope="col">Status</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.reservas && this.state.reservas.map(reserva => {
                                return <tr key={reserva.id}>
                                    <th scope="row">{reserva.id}</th>
                                    <td>{(reserva.dataHoraReserva).toString().replace("T"," ")}</td>
                                    <td>{reserva.nomeUsuario}</td>
                                    <td>{reserva.telefone}</td>
                                    <td>{reserva.qtdLugares}</td>
                                    <td>{reserva.mesa}</td>
                                    <td>{(reserva.expiracaoReserva).toString().replace("T"," ")}</td>
                                    <td>{(reserva.status).toString().replaceAll('"',"")}</td>
                                    <td className="textoright">
                                        <div className="btn-group">
                                            <div className="p-1">
                                                <button onClick={() => this.funcAlterarTela(reserva)} className="btn btn-sm btn-warning"><i className="bi bi-pencil"></i> Alterar Reserva</button>
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

    renderEditarItem = () => {
        return(
            <div className="mt-5 p-5 row">
                <div className="col-12">
                    <form className="form-group">
                        <div className="mb-3">
                            <label className="mb-2 form-label">Status</label>
                            <select onChange={this.funcStatusAlterar} className="form-select" aria-label="Escolha do status">
                                <option defaultValue>Selecione um status</option>
                                <option value="Aguardando Confirmação">Aguardando Confirmação</option>
                                <option value="Cancelado">Cancelado</option>
                                <option value="Confirmado">Confirmado</option>
                            </select>
                        </div>
                        

                    </form>
                    <div className="btn-group">
                            <div className="p-1">
                                <button onClick={() => this.funcAlterarReserva()} className="btn btn-primary">Salvar</button>                        
                            </div>
                            <div className="p-1">
                                <button className="btn btn-secondary" onClick={() => this.funcAlterarTela()}>Voltar</button>
                            </div>
                            
                        </div>
                    
                </div>
            </div>
            
        )
    }


    render(){
        let tela;
        if(this.state.alterarrender === 1){
            tela= this.renderTabela();
        }else{
            tela= this.renderEditarItem();
        }
        return tela
    }
}