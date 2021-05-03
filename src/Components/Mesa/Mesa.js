import React, { Component } from 'react'

export default class Mesa extends Component {
    state = {
        qtdCadeira: "",
        status: ""
    }
        txtNome_change = (event)=> {
            this.setState({qtdCadeira: event.target.value})
        }
        
        gravarNovo = () => {
            const dados = {
                "qtdCadeira": this.state.qtdCadeira,
                "status": this.state.status
                
            }

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
                    
                    <div class="from-check">
                        Mesa reservada:  
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                        <label class="form-check-label" for="flexCheckDefault">
                        </label>
                        </div>
                        <div className="row mt-2">
                            <div className="col-1">
                                <button className="btn btn-primary"OnClick = {() => this.gravarNovo()}>Gravar</button>
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
