import React, { Component } from 'react'

export default class Mesa extends Component {
    state = {
        qtdCadeiras: "",
        reservada: ""
    }

    txtNome_change = (event)=> {
        console.log(event.target.value)
        this.setState({qtdCadeiras: event.target.value})
    }

    chkmesa = (event) =>{
        this.setState({reservada: event.target.checked})
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
        .catch(erro=>console.log('erro'));
    }



    render() {
        return (
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
                            <button className="btn btn-primary" >Voltar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}