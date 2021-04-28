import { Component } from "react";



export default class Footer extends Component{
    render(){
        return(
            <div className="row">
                <div className="col-12 text-white p-2 text-center bg-dark fixed-bottom"> 
                    <span dangerouslySetInnerHTML={{ "__html": "&copy;" }} />Copyright 2021 - Restaurante DS1
                </div>
            </div>
        )
    }
}