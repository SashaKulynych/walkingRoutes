import React,{Component} from "react";

import AuthorizationView from './AuthorizationView'

import {push} from 'react-router-redux';
import {store} from '../../index';

import { connect } from 'react-redux';

import AlertContainer from 'react-alert';


class AuthorizationSettings extends Component {
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:""
        };
        this.login = this.login.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }
    login(){
        let http = new XMLHttpRequest();
        http.open('GET', 'http://localhost:3000/users?email='+this.state.email+'&password='+this.state.password);
        http.setRequestHeader("Content-Type", "application/json");
        http.responseType = 'json';
        http.onload = ()=> {
            if (http.readyState==4 && http.status == 200) {
                if(http.response!="") {
                    localStorage.setItem('USER_SUCCESS',JSON.stringify(http.response[0]))
                    store.dispatch({type:'USER_SUCCESS', payload:http.response[0]});
                    store.dispatch(push('/user'))
                }
                else {
                    this.msg.show('Wrong Email or Password!', {
                        time: 3000,
                        type: 'error',
                        icon: <img src="http://allbasketball.org/templates/AB2014/images/alert.png" />
                    });
                }
            }
        };
        http.send();
    }
    changeEmail(event){
        this.setState({email: event.target.value});
    }
    changePassword(event){
        this.setState({password: event.target.value});
    }
    render(){
         const alertOptions = {
            offset: 14,
            position: 'bottom right',
            theme: 'dark',
            time: 4000,
            transition: 'scale'
        };
        return(
            <div>
               <AuthorizationView
                   email={this.state.email}
                   password={this.state.password}
                   changeEmail={this.changeEmail}
                   changePassword={this.changePassword}
                   login={this.login}
               />
                <AlertContainer ref={a => this.msg = a} {...alertOptions} />
            </div>
        );
    }
}
export default connect()(AuthorizationSettings)