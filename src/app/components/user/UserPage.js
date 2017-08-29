import React,{Component} from "react";

import {store} from '../../index';
import {push} from 'react-router-redux';
import { connect } from 'react-redux';

import MapContainer from './MapContainer';

import UserPageMenuView from './UserPageMenuView'

import "./styles.css";

class UserPage extends Component {
    constructor(props){
        super(props);
        this.state={
            inputCategoryName:""
        };
        this.handleInputCategoryName = this.handleInputCategoryName.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.categoriesList = this.categoriesList.bind(this);
        this.exit = this.exit.bind(this);
    }
    componentDidMount(){
        let value = JSON.parse(localStorage.getItem('USER_SUCCESS'));
        if(value!=null){
            store.dispatch({type:'USER_SUCCESS', payload:value});
        }else store.dispatch(push('/'))
    }
    exit(){
        localStorage.setItem('USER_SUCCESS',null);
        store.dispatch(push('/'));
    }
    handleInputCategoryName(event){
        this.setState({
            inputCategoryName:event.target.value
        });
    }
    categoriesList(){
        let http = new XMLHttpRequest();
        let categoriesList=[];
        http.open('GET', 'http://localhost:3000/categories',false);
        http.setRequestHeader("Content-Type", "application/json");
        http.onload = ()=> {
            if (http.readyState == 4 && http.status == 200) {
                if (http.response != "") {
                    categoriesList = http.response
                }
            }
        };
        http.send();
        console.log(categoriesList)
       /* categoriesList.map(value=>{
            return <li><a href="#">{value.name}</a></li>
        });
        return categoriesList;*/
    }
    addCategory(){
        let http = new XMLHttpRequest();
        http.open('GET', 'http://localhost:3000/categories?name='+this.state.inputCategoryName);
        http.setRequestHeader("Content-Type", "application/json");
        http.responseType = 'json';
        http.onload = ()=> {
            if (http.readyState==4 && http.status == 200) {
                if(http.response!="") {
                    alert("Category exist!")
                }
                else {
                    http.open("POST", 'http://localhost:3000/categories');
                    http.setRequestHeader("Content-Type", "application/json");
                    http.send(
                        JSON.stringify({
                            "name":this.state.inputCategoryName
                        })
                    );
                    alert("Category Add!")
                }
            }
        };
        http.send();
    }
    render(){
        return(
            <div id="userPageStyle">
                <div className="MainBlock">
                    <div className="FirstBlock">
                        <UserPageMenuView
                            inputCategoryName={this.state.inputCategoryName}
                            handleInputCategoryName = {this.handleInputCategoryName}
                            addCategory = {this.addCategory}
                            categoriesList = {this.categoriesList}
                            exit = {this.exit}
                        />
                    </div>
                    <div className="SecondBlock">
                        <MapContainer/>
                    </div>
                </div>
            </div>
        );
    }
}
export default connect(
    state=>({
        user: state
    }),
    dispatch =>({})
)(UserPage)