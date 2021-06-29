import React, { Component } from 'react'

export default class Mesa extends Component {
    state = {
        qtdCadeiras: "",
        reservada: "",
        mesas: [],
        incluindo: false,
        alterando: false,
        id: "",
        mesaReservada: true
    }

    txtNome_change = (event)=> {
        console.log(event.target.value)
        this.setState({qtdCadeiras: event.target.value})
    }

    chkmesa = (event) =>{
        console.log(event.target.checked)
        if(event.target.checked) {
            this.setState({mesaReservada: false})
            

        } else{
            this.setState({mesaReservada: true})
        }
    }
    


    preencherLista = () => {
    const url = window.servidor + "/mesa/"
    fetch(url)
        .then(response => response.json())
        .then((data) => {
            this.setState({mesas: data})
            console.log(data)
        })
}

componentDidMount(){
    this.preencherLista()

}

iniciarAlterar = (Mesa) => {

    if(Mesa.reservada === true){
        this.setState({mesaReservada:true})
        }else{
            this.setState({mesaReservada:false})
        
        
        }
        console.log(this.state.mesaReservada)
this.setState({alterando: true, qtdCadeiras: Mesa.qtdCadeiras,id: Mesa.id, reservada: Mesa.reservada})
}

iniciarNovo = () => {
    this.setState({incluindo:true, qtdCadeiras: '', reservada: ''})

}

    gravarNovo = () => {
        const dados = {
            "qtdCadeiras": this.state.qtdCadeiras,
            "reservada": this.state.reservada

        }
            console.log(dados)
            
        const requestOptions = {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
                
        };
        
        const url = window.servidor + '/mesa/incluir'
        fetch(url, requestOptions)
        .then(console.log('Gravado'))
        .then(this.setState({incluindo: false}))
        .then(this.preencherLista())
        .catch(erro=>console.log('erro'))
        .then(() => {
            this.componentDidMount()
        })

    }
    ValidarReserva = (Mesa) => {
        if(Mesa.reservada === true){
            return <div>Mesa reservada</div>
    }else{
        return <div>Disponível</div>

    }

}
    gravarAlterar = () => {
        const dados = {
            "id": this.state.id,
            "qtdCadeiras": this.state.qtdCadeiras,
            "reservada": this.state.reservada

        }
        console.log(dados)

        const requestOptions = {
            method:'POST',
            headers:{
                'Content-Type': 'application/json', 'Acess-Control-Allow-Origin':'*'

            },
            body: JSON.stringify(dados)
                
        };
        
        const url = window.servidor + '/mesa/alterar/' + this.state.id
        fetch(url, requestOptions)
        .then(console.log('Gravado'))
        .then(this.setState({alterando: false}))
        .then(this.preencherLista())
        .catch(erro=>console.log('erro'))
        .then(() => {
            this.componentDidMount()
        })

    }


    excluir = (Mesa) => {
    

        const requestOptions = {
            method:'GET',
            headers:{
                'Content-Type': 'application/json', 'Acess-Control-Allow-Origin':'*'

            },
    
                
        };
    
        const url = window.servidor + '/mesa/' + Mesa.id
        fetch(url, requestOptions)
        .then(console.log('Excluido'))
        .then(this.preencherLista())
        .then(() => {
            this.componentDidMount()
        })
        .catch(erro=>console.log('erro'));

    }

    voltar = () => {
        this.setState({incluindo: false, alterando: false})
    }


    renderCadastrarMesa = () => {
        return(
            <div className="row mt-5 p-3 mb-5">
            <h2 className="p-3 text-center mt-4">Gerenciar Mesas</h2>
            <div className="col-4 mt-2 container-fluid">
                    
                <div className="mb-3">
                    <label className="col-form-label">Quantidade de cadeiras</label>
                    <input value={this.state.qtdCadeiras} onChange={this.txtNome_change} className="form-control name-pull-image" type="text"></input>     
                </div>
                
                <div className="form-check">
                Mesa reservada:  
                <input className="form-check-input" onChange={this.chkmesa} type="checkbox" value="1" id="flexCheckDefault"></input>
                <label className="form-check-label"></label>
                </div>
                <div className="row mt-3">
                    <div className="col-3">
                        <button className="btn btn-primary" onClick = {() => this.gravarNovo()}>Gravar</button>
                    </div>
                    <div className="col-1"/>
                    <div className="col-3">
                        <button className="btn btn-primary" onClick ={() => this.voltar()} >Voltar</button>
                    </div>
                </div>
            </div>
        </div>
        
        )

    }

    renderAlterar = () => {
        return(
            <div className="row mt-5 p-3 mb-5">
            <h2 className="p-3 text-center mt-4">Gerenciar Mesas</h2>
            <div className="col-4 mt-2 container-fluid">
                    
                <div className="mb-3">
                    <label className="col-form-label">ID:</label>
                    <input value={this.state.id} readOnly className="form-control name-pull-image" type="text"></input>     
                </div>
                <div className="mb-3">
                    <label className="col-form-label">Quantidade de cadeiras</label>
                    <input value={this.state.qtdCadeiras} onChange={this.txtNome_change} className="form-control name-pull-image" type="text"></input>     
                </div>
                
                <div className="form-check">
                Mesa reservada:  
                <input className="form-check-input" onChange={this.chkmesa} type="checkbox" value="1" checked={this.state.mesaReservada} id="flexCheckDefault"></input>
                <label className="form-check-label"></label>
                </div>
                <div className="row mt-3">
                    <div className="col-3">
                        <button className="btn btn-primary" onClick = {() => this.gravarAlterar()}>Gravar</button>
                    </div>
                    <div className="col-1"/>
                    <div className="col-3">
                        <button className="btn btn-primary" onClick ={() => this.voltar()} >Voltar</button>
                    </div>
                </div>
            </div>
        </div>
        
        )

    }
    renderExibirLista = () => {
        return (
            <div className="mt-5 pt-4"> 
            <button type="button" className="btn btn-outline-primary mt-2" onClick = {() => this.iniciarNovo()}>Novo</button>
                
                <table className="table mt-3">
                    <thead>
                        <tr>
                            <th scope="col">Mesa Numero:</th>
                            <th scope="col">Quantidade de cadeiras:</th>
                            <th scope="col">Reservado:  </th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.mesas && this.state.mesas.map(Mesa => {
                        return <tr key={Mesa.id}>
                            <th scope="row">{Mesa.id}</th>
                            <td>{Mesa.qtdCadeiras}</td>
                            <td>{this.ValidarReserva(Mesa)}</td>   
                            <td> </td>
                            <td><button onClick={() => this.iniciarAlterar(Mesa)}type="button" className="btn btn-primary" data-toggle="tolltip" data-placement="top" title="Editar Mesa"><i className="bi bi-pencil-square"></i></button></td>
                            <td><button onClick={() => this.excluir(Mesa)}type="button" className="btn btn-danger" data-toggle="tolltip" data-placement="top" title="Excluir Mesa"><i className="bi bi-trash"></i></button></td>

                            <td className="text-center"></td>
                        </tr>

                        })}

                    </tbody>
                </table>
            </div>
        )
    }





    render() {

        let pagina = '';

        if(this.state.incluindo){
            pagina = this.renderCadastrarMesa()
        } else{
            if (this.state.alterando){
                pagina = this.renderAlterar()
            } else {
                pagina = this.renderExibirLista()
            }
        
        }

        return pagina

    }
}
