import React, { Component } from 'react'

export default class Mesa extends Component {
    state = {
        qtdCadeira: "",
        status: ""
    }
        txtNome_change = (event)=> {

            console.log(event.target.value)
            this.setState({qtdCadeira: event.target.value})

        }


        chkmesa = (event) =>{

            this.setState({status: event.target.checked})
        }
        
        gravarNovo = () => {
            const dados = {
                "qtdCadeira": this.state.qtdCadeira,
                "status": this.state.status
                
            }
                console.log(dados)
                
            const requestOptions = {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
                    
            };
            
            const url = "http://localhost:8080/mesa/"
            fetch(url, requestOptions)
            .then(console.log('Gravado'))
            .catch(erro=>console.log('erro'));
        }



    render() {
        return (
            <div>
                <div className="row mt-5 pt-3">
                    <div className="col-2">
                    Quantidade de cadeira:
                    </div>
                    <div className="row mt-2">
                        <div className="col-2">
                        <input value={this.state.qtdCadeira} onChange={this.txtNome_change} className="form-control name-pull-image" type="text"></input>     
                        </div>       
                    </div>
                    
                    <div className="form-check">
                        Mesa reservada:  
                        <input className="form-check-input" onChange={this.chkmesa} type="checkbox" value="1" id="flexCheckDefault"></input>
                        <label className="form-check-label">
                        </label>
                        </div>
                        <div className="row mt-2">
                            <div className="col-1">
                                <button className="btn btn-primary" onClick = {() => this.gravarNovo()}>Gravar</button>
                            </div>
                        <div className="col-1">
                            <button className="btn btn-primary" >Voltar</button>
                        </div>
                        </div>
                    </div>
                </div>
        
        )
    }
}
