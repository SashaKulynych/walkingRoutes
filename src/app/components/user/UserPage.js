import React,{Component} from "react";

import {store} from '../../index';
import {push} from 'react-router-redux';
import { connect } from 'react-redux';

import MapContainer from './MapContainer';

import UserPageMenuView from './UserPageMenuView'
import RouteInfo from './RouteInfo'

import AlertContainer from 'react-alert';

import "./styles.css";

class UserPage extends Component {
    constructor(props){
        super(props);
        this.state={
            inputCategoryName:"",
            listCategory:[],
            listRoute:[],
            selectOption:[],
            markers: [],
            flightPlanCoordinates:[],
            routeName:'',
            routeDest:'',
            routeCategory:'0',
            routeLength:'',
            textRouteName:'',
            textRouteDest:'',
            textRouteCategory:'',
            textRouteLength:'',
            centerMap:{ lat: 49.444356503879916, lng: 32.05780506134033}
        };
        this.handleInputCategoryName = this.handleInputCategoryName.bind(this);
        this.handleInputRouteName = this.handleInputRouteName.bind(this);
        this.handleTextarea = this.handleTextarea.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.routeData = this.routeData.bind(this);
        this.addRoute = this.addRoute.bind(this);
        this.getRouteData = this.getRouteData.bind(this);
        this.exit = this.exit.bind(this);
        this.refresh = this.refresh.bind(this);
        this.closeRouteInfo = this.closeRouteInfo.bind(this);
        this.resourceList = this.resourceList.bind(this);
        this.handleMarkers = this.handleMarkers.bind(this);
    }
    componentDidMount(){
        let value = JSON.parse(localStorage.getItem('USER_SUCCESS'));
        if(value!=null){
            store.dispatch({type:'USER_SUCCESS', payload:value});
        }else store.dispatch(push('/'));
        this.resourceList('categories');
        this.resourceList('routes');

    }
    exit(){
        localStorage.setItem('USER_SUCCESS',null);
        store.dispatch(push('/'));
    }
    handleMarkers(value){
        this.setState({
            markers:value
        });
    }
    handleCategory(event){
        this.setState({
            routeCategory:event.target.value
        });
    }
    handleTextarea(event){
        this.setState({
            routeDest:event.target.value
        });
    }
    handleInputRouteName(event){
        this.setState({
            routeName:event.target.value
        });
    }
    handleInputCategoryName(event){
        this.setState({
            inputCategoryName:event.target.value
        });
    }
    deleteData(id,resource){
        let http = new XMLHttpRequest();
        let url = 'http://localhost:3000/'+resource+'/'+id;
        console.log(url);
        http.open("DELETE", url,false);
        http.setRequestHeader("Content-Type", "application/json");
        http.send(null);
        this.msg.show('One of '+ resource+' Deleted!', {
            time: 3000,
            type: 'success'
        });
        this.resourceList(resource);
    }
    routeData(nextMarkers,nextLines){
        this.setState({
            markers: nextMarkers,
            flightPlanCoordinates:nextLines,
            routeLength: google.maps.geometry.spherical.computeLength(nextLines)
        });
    }
    getRouteData(data){
        document.getElementsByClassName('card')[0].style.opacity = '1';
        document.getElementsByClassName('card')[0].style.visibility = 'visible';
        document.getElementsByClassName('card')[0].style.transitionDelay = '0s';
        this.setState({
            centerMap:data.flightPlanCoordinates[0],
            textRouteName:data.name,
            textRouteDest:data.description,
            textRouteCategory:data.category,
            textRouteLength:data.length,
            markers:data.markers,
            flightPlanCoordinates:data.flightPlanCoordinates,
        })
    }
    resourceList(resource){
        let http = new XMLHttpRequest();
        let resourceList='';
        let url = 'http://localhost:3000/'+resource;
        http.open('GET', url,false);
        http.setRequestHeader("Content-Type", "application/json");
        http.onload = ()=> {
            if (http.readyState == 4 && http.status == 200)
                if (http.response !='') resourceList = http.response;
        };
        http.send();
        let list = JSON.parse(resourceList);
        const listView = list.map((data)=> {
                if (resource == 'categories'){
                    return (
                        <div key={data.id}>
                            <li>{data.name}</li>
                            <i onClick={() => {this.deleteData(data.id, "categories")}}
                               className="fa fa-times fa-lg deleteIcon"/>
                        </div>
                    );
                }
                if (resource == 'routes'){
                    return (
                        <div key={data.id}>
                            <li onClick={() => this.getRouteData(data)}>{data.name}</li>
                            <i onClick={() => {this.deleteData(data.id, "routes")}}
                               className="fa fa-times fa-lg deleteIcon"/>
                        </div>
                    );
                }
            }
        );
        if(resource=='routes'){
            this.setState({
                listRoute:listView
            });
        }
        if(resource=='categories'){
            const optionView = list.map((data)=> {
                return (
                    <option key={data.id} value={data.id}>{data.name}</option>
                );
            }
            );
            this.setState({
                selectOption:optionView,
                listCategory:listView
            });
        }
    }
    refresh(){
        this.setState({
            markers: [],
            flightPlanCoordinates:[],
        });
        this.closeRouteInfo();
    }
    closeRouteInfo(){
        document.getElementsByClassName('card')[0].style.opacity = '0';
        document.getElementsByClassName('card')[0].style.visibility = 'hidden';
        document.getElementsByClassName('card')[0].style.transition = 'opacity 0.3s, visibility 0s linear 0.3s';
    }
    addRoute(){
        if(this.state.markers.length==0||this.state.flightPlanCoordinates.length==0)
            return(
                this.msg.show('Lay the route!', {
                    time: 3000,
                    type: 'error',
                    icon: <img src="http://allbasketball.org/templates/AB2014/images/alert.png" />
                })
            );
        let xml = new XMLHttpRequest();
        xml.open("POST", 'http://localhost:3000/routes',false);
        xml.setRequestHeader("Content-Type", "application/json");
        xml.send(
            JSON.stringify({
                "name": this.state.routeName,
                "description": this.state.routeDest,
                "category": this.state.routeCategory,
                "length": this.state.routeLength,
                "markers":this.state.markers,
                "flightPlanCoordinates": this.state.flightPlanCoordinates
            })
        );
        this.resourceList('routes');
        this.msg.show('Route Add!', {
            time: 3000,
            type: 'success'
        });
    }
    addCategory(){
        let http = new XMLHttpRequest();
        http.open('GET', 'http://localhost:3000/categories?name='+this.state.inputCategoryName);
        http.setRequestHeader("Content-Type", "application/json");
        http.responseType = 'json';
        http.onload = ()=> {
            if (http.readyState==4 && http.status == 200) {
                if(http.response!="") {
                    this.msg.show('Category exist!', {
                        time: 3000,
                        type: 'error',
                        icon: <img src="http://allbasketball.org/templates/AB2014/images/alert.png" />
                    });
                }
                else {
                    let xml = new XMLHttpRequest();
                    xml.open("POST", 'http://localhost:3000/categories',false);
                    xml.setRequestHeader("Content-Type", "application/json");
                    xml.send(
                        JSON.stringify({
                            "name":this.state.inputCategoryName
                        })
                    );
                    this.resourceList('categories');
                    this.msg.show('Category Add!', {
                        time: 3000,
                        type: 'success'
                    });
                }
            }
        };
        http.send();
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
            <div id="userPageStyle">
                <div className="MainBlock">
                    <div className="FirstBlock">
                        <UserPageMenuView
                            inputCategoryName={this.state.inputCategoryName}
                            handleInputCategoryName = {this.handleInputCategoryName}
                            handleInputRouteName = {this.handleInputRouteName}
                            handleTextarea = {this.handleTextarea}
                            handleCategory = {this.handleCategory}
                            addCategory = {this.addCategory}
                            addRoute = {this.addRoute}
                            listCategory = {this.state.listCategory}
                            listRoute = {this.state.listRoute}
                            selectOption = {this.state.selectOption}
                            exit = {this.exit}
                            refresh = {this.refresh}
                        />
                    </div>
                    <div className="SecondBlock">
                        <RouteInfo
                            textRouteName = {this.state.textRouteName}
                            textRouteCategory = {this.state.textRouteCategory}
                            textRouteDest = {this.state.textRouteDest}
                            closeRouteInfo = {this.closeRouteInfo}
                        />
                        <MapContainer
                            routeData = {this.routeData}
                            markers = {this.state.markers}
                            handleMarkers = {this.handleMarkers}
                            centerMap = {this.state.centerMap}
                            flightPlanCoordinates = {this.state.flightPlanCoordinates}
                        />
                    </div>
                </div>
                <AlertContainer ref={a => this.msg = a} {...alertOptions} />
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