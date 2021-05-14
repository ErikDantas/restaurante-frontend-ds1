import { Component } from "react";
import './LayoutCSS.css'



export default class Footer extends Component{
    render(){
        return(
            <div className="row">
                <div className="col-12 text-white p-2 text-center bg-ds1-primary fixed-bottom"> 
                    <span dangerouslySetInnerHTML={{ "__html": "&copy;" }} />Copyright 2021 - Restaurante DS1
                </div>
            </div>
        )
    }
}