import React,{Component} from "react";

import "../mainPageStyles.css";

import {push} from 'react-router-redux';
import {store} from '../../index';

export default class Registration extends Component {
    render(){
        return(
            <div className="mainPageStyle">
                <div className="mainBlock">
                <div className="blockCenter well">
                        <h3 className="text-center">Registration</h3>
                        <form className="form">
                                <div className="form-group">
                                    <input type="email" className="form-control" placeholder="E-mail"
                                           value={this.props.email} onChange={this.props.changeEmail}
                                    />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="Password"
                                           value={this.props.password} onChange={this.props.changePassword}
                                    />
                                </div>
                            <div className="row d-flex justify-content-center">
                                <div className=" col-xs-6">
                                    <input type="button" className="btn btn-default" value="Registrarion"
                                           onClick={this.props.AddUser}
                                    />
                                </div>
                                <div className=" col-xs-6">
                                    <input type="button" className="btn btn-default" value="Back To Login"
                                           onClick={()=>store.dispatch(push('/'))}
                                    />
                                </div>
                            </div>
                        </form>

                </div>
                    </div>
                </div>
        );
    }
};