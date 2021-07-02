import { Component } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Home extends Component{


    render(){
        return(
            <div className="mt-5 p-3">
                <ToastContainer/>
                <div className="row">
                    <div className="col-12 text-center mt-3">
                        <img src="https://media.gazetadopovo.com.br/bomgourmet/2019/07/comida-caipira-768x307-a5c1ed80.jpg" className="img-fluid" alt="..."/>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 text-center">
                        <h2>Restaurante DS1</h2>
                    </div>
                    
                </div>
            </div>

        )
    }
}