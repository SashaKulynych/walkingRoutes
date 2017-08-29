import React,{Component} from "react";

import "../mainPageStyles.css";

import {push, Link} from 'react-router-redux';
import {store} from '../../index';

export default class AuthorizationView extends Component {
    render(){
        return(
            <div className="mainPageStyle">
                <div className="mainBlock">
                    <div className="blockCenter well">
                        <h3 className="text-center">Authorization</h3>
                        <form className="form">
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <input type="email" className="form-control" placeholder="E-mail"
                                           value={this.props.email} onChange={this.props.changeEmail}
                                    />
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="Password"
                                           value={this.props.password} onChange={this.props.changePassword}
                                    />
                                </div>
                            </div>
                            <div className="row d-flex justify-content-center">
                                <div className=" col-xs-6">
                                    <input type="button" className="btn btn-default" value="Login"
                                           onClick={this.props.login}
                                    />
                                </div>
                                <div className="text-center col-xs-6">
                                    <input type="button" className="btn btn-default" value="Sing Up"
                                           onClick={()=>store.dispatch(push('/registration'))}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                </div>
        );
    }
}