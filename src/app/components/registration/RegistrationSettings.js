import React,{Component} from "react";

import RegistrationView from './RegistrationView'

import AlertContainer from 'react-alert';

export default class Registration extends Component {
    constructor(){
        super();
        this.state={
            email:"",
            password:"",
            uniqueEmail:""
        };
        this.AddUser = this.AddUser.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }
    AddUser(){
        let r = /^\w+@\w+\.\w{2,4}$/i;
        if (!r.test(this.state.email)) {
            return (
                this.msg.show('Not correct Email!', {
                    time: 3000,
                    type: 'error',
                    icon: <img src="http://allbasketball.org/templates/AB2014/images/alert.png" />
                })
            )
        }
        let http = new XMLHttpRequest();
        http.open('GET', 'http://localhost:3000/users?email='+this.state.email);
        http.setRequestHeader("Content-Type", "application/json");
        http.responseType = 'json';
        http.onload = ()=> {
            if (http.readyState==4 && http.status == 200) {
                if (http.response != "") {
                    this.msg.show('Email exist!', {
                        time: 3000,
                        type: 'error',
                        icon: <img src="http://allbasketball.org/templates/AB2014/images/alert.png" />
                    });
                }
                else {
                    http.open("POST", 'http://localhost:3000/users');
                    http.setRequestHeader("Content-Type", "application/json");
                    http.send(
                        JSON.stringify({
                            "email": this.state.email,
                            "password": this.state.password
                        })
                    );
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
                <RegistrationView
                    email = {this.state.email}
                    password = {this.state.password}
                    changeEmail = {this.changeEmail}
                    changePassword = {this.changePassword}
                    AddUser = {this.AddUser}
                />
                <AlertContainer ref={a => this.msg = a} {...alertOptions} />
            </div>
        );
    }
};