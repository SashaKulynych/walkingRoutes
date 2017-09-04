import React,{Component} from "react";

import {store} from '../../index';
import {push} from 'react-router-redux';
import { connect } from 'react-redux';

import MapContainer from './Map/MapContainer';

import UserPageMenuView from './UserPageMenuView'
import RouteInfoView from './RouteInfo/RouteInfoView'

import AlertContainer from 'react-alert';
import {fetchName,checkBoxFavorite,RouteInfoDisplay,ViewRouteData} from './requestFunction';
import "./styles.css";

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo:{},
            inputCategoryName: "",
            listCategory: [],
            listRoute: [],
            listFavorites:[],
            myListRoute:[],
            selectOption: [],
            searchRoutes:[],
            markers: [],
            flightPlanCoordinates: [],
            routeName: '',
            routeDest: '',
            routeCategory: '0',
            routeLength: '',
            textRouteName: '',
            textRouteDest: '',
            textRouteCategory: '',
            textRouteLength: '',
            showRouteData: 0,
            centerMap: {lat: 49.444356503879916, lng: 32.05780506134033},
            favorite:false,
            checkedRouteId:0,
            commentTextarea:'',
            rating:1,
            searchInput:''
        };
        this.addCategory = this.addCategory.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.routeData = this.routeData.bind(this);
        this.addRoute = this.addRoute.bind(this);
        this.getRouteData = this.getRouteData.bind(this);
        this.exit = this.exit.bind(this);
        this.refresh = this.refresh.bind(this);
        this.resourceList = this.resourceList.bind(this);
        this.handleMarkers = this.handleMarkers.bind(this);
        this.handleCheckboxFavorite = this.handleCheckboxFavorite.bind(this);
        this.handleState = this.handleState.bind(this);
        this.favoriteClick = this.favoriteClick.bind(this);
        this.addComment = this.addComment.bind(this);
        this.handleRating = this.handleRating.bind(this);
        this.myRoutes = this.myRoutes.bind(this);
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        let value = JSON.parse(localStorage.getItem('USER_SUCCESS'));
        if (value != null) {
            store.dispatch({type: 'USER_SUCCESS', payload: value});
        } else store.dispatch(push('/'));

        this.setState({userInfo:value});
        this.myRoutes(value);
        this.resourceList('categories');
        this.resourceList('routes');
        this.resourceList('favorites');
    }
    exit() {
        localStorage.setItem('USER_SUCCESS', null);
        store.dispatch(push('/'));
    }

    handleMarkers(value) {
        this.setState({
            markers: value
        });
    }
    handleState(event,state){
        this.setState({
            [state]: event.target.value
        });
    }
    handleRating(e){
        this.setState({
            rating:e
        });
    }

    handleCheckboxFavorite(event){
        checkBoxFavorite(this.state.checkedRouteId,this.state.userInfo);
        this.resourceList('favorites');
        this.setState({
            favorite: event.target.checked
        });
    }
    deleteData(id, resource) {
        let http = new XMLHttpRequest();
        let url = 'http://localhost:3000/' + resource + '/' + id;
        console.log(url);
        http.open("DELETE", url, false);
        http.setRequestHeader("Content-Type", "application/json");
        http.send(null);
        this.msg.show('One of ' + resource + ' Deleted!', {
            time: 3000,
            type: 'success'
        });
        this.resourceList(resource);
        this.myRoutes(this.state.userInfo)
    }

    routeData(nextMarkers, nextLines) {
        this.setState({
            markers: nextMarkers,
            flightPlanCoordinates: nextLines
        });
    }
    favoriteClick(id){
        let http = new XMLHttpRequest();
        let resourceList = '';
        let url = 'http://localhost:3000/routes/'+id;
        http.open('GET', url,false);
        http.setRequestHeader("Content-Type", "application/json");
        http.onload = ()=> {
            if (http.readyState == 4 && http.status == 200)
                if (http.response !=''){
                    resourceList = http.response;
                    this.getRouteData(JSON.parse(resourceList));
                }
        };
        http.send();
    }
    getRouteData(data) {
        RouteInfoDisplay(true);
        let routeData = ViewRouteData(data);
        this.setState({
            checkedRouteId: routeData.checkedRouteId,
            textRouteName: routeData.textRouteName,
            textRouteDest: routeData.textRouteDest,
            textRouteLength: routeData.textRouteLength,
            textRouteCategory: routeData.textRouteCategory,
            centerMap: routeData.centerMap,
            markers: routeData.markers,
            flightPlanCoordinates:routeData.flightPlanCoordinates ,
            favorite: routeData.favorite,
            commentTextarea:"",
            rating:1
        })
    }
    myRoutes(value){
        let http = new XMLHttpRequest();
        let resourceList='';
        let url = 'http://localhost:3000/routes?user='+value.id;
        http.open('GET', url,false);
        http.setRequestHeader("Content-Type", "application/json");
        http.onload = ()=> {
            if (http.readyState == 4 && http.status == 200)
                if (http.response !='') resourceList = http.response;
        };
        http.send();
        let list = JSON.parse(resourceList);
        const listView = list.map((data)=> {
            return (
                <div key={data.id}>
                    <li onClick={() => this.getRouteData(data)}>{data.name}</li>
                    <i onClick={() => {
                        this.deleteData(data.id, "routes")
                    }}
                       className="fa fa-times fa-lg deleteIcon"/>
                </div>
            );
            }
        );
        this.setState({
            myListRoute:listView
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
                switch (resource) {
                    case 'categories': {
                        return (
                            <div key={data.id}>
                                <li>{data.name}</li>
                                <i onClick={() => {
                                    this.deleteData(data.id, "categories")
                                }}
                                   className="fa fa-times fa-lg deleteIcon"/>
                            </div>
                        );
                    }
                        break;
                    case 'routes': {
                        return (
                            <div key={data.id}>
                                <li onClick={() => this.getRouteData(data)}>{data.name}</li>
                                <i onClick={() => {
                                    this.deleteData(data.id, "routes")
                                }}
                                   className="fa fa-times fa-lg deleteIcon"/>
                            </div>
                        );
                    }
                        break;
                    case 'favorites': {
                        return (
                            <div key={data.id}>
                                <li onClick={() => this.favoriteClick(data.route)}>{fetchName(data.route, "routes","name")}</li>
                                <i onClick={() => {
                                    this.deleteData(data.id, "favorites")
                                }}
                                   className="fa fa-times fa-lg deleteIcon"/>
                            </div>
                        );
                    }
                        break;
                }
            }
        );
        switch (resource){
            case 'routes':{
                this.setState({listRoute:listView});
            }
            break;
            case 'favorites':{
                this.setState({listFavorites:listView});
            }
            break;
            case 'categories':{
                const optionView = list.map((data)=> {
                        return (
                            <option key={data.id} value={data.id}>{data.name}</option>
                        );
                    }
                );
                this.setState({
                    selectOption:optionView,
                    listCategory:listView,
                });
            }
            break;
        }
    }
    refresh(){
        this.setState({markers: [], flightPlanCoordinates:[]});
        RouteInfoDisplay(false);
    }
    addComment(){
        if(this.state.commentTextarea!=""){
            let http = new XMLHttpRequest();
            http.open("POST", 'http://localhost:3000/comments');
            http.setRequestHeader("Content-Type", "application/json");
            http.send(
                JSON.stringify({
                    "route": this.state.checkedRouteId,
                    "description": this.state.commentTextarea,
                    "user":this.state.userInfo.id,
                    "rating":this.state.rating,
                    "date":new Date()
                })
            );
            this.msg.show('Comment Add', {
                time: 3000,
                type: 'success'
            });
        }
        else{
            this.msg.show('Enter a comment', {
                time: 3000,
                type: 'error',
                icon: <img src="http://allbasketball.org/templates/AB2014/images/alert.png" />
            });
        }

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
        if(this.state.routeCategory==0){
            return(
                this.msg.show('Set category!', {
                    time: 3000,
                    type: 'error',
                    icon: <img src="http://allbasketball.org/templates/AB2014/images/alert.png" />
                })
            );
        }
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
                "flightPlanCoordinates": this.state.flightPlanCoordinates,
                "user": this.state.userInfo.id
            })
        );
        this.resourceList('routes');
        this.myRoutes(this.state.userInfo)
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
    search(e,value){
        let http = new XMLHttpRequest();
        let resourceList='';
        let url ='';
        if(value=="input")url = 'http://localhost:3000/routes?q='+e.target.value;
        else if(value=="select")url = 'http://localhost:3000/routes?category='+e.target.value;
        if(e.target.value=='') url='http://localhost:3000/routes?q=youdonthaveanyroutesforyoursearch';
        http.open('GET', url,false);
        http.setRequestHeader("Content-Type", "application/json");
        http.onload = ()=> {
            if (http.readyState == 4 && http.status == 200)
               resourceList = http.response;
        };
        http.send();
        let list = JSON.parse(resourceList);
        const listView = list.map((data)=> {
                        return (
                            <div key={data.id}>
                                <li onClick={() => this.getRouteData(data)}>{data.name}</li>
                                <i onClick={() => {
                                    this.deleteData(data.id, "routes")
                                }}
                                   className="fa fa-times fa-lg deleteIcon"/>
                            </div>
                        );
            }
        );
        if(value=="select"){
            this.setState({
                searchRoutes:listView
            })
        }
        if(value=="input"){
            this.setState({
                searchInput:e.target.value,
                searchRoutes:listView
            })
        }

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
                            userInfo = {this.state.userInfo}
                            inputCategoryName={this.state.inputCategoryName}
                            addCategory = {this.addCategory}
                            addRoute = {this.addRoute}
                            listCategory = {this.state.listCategory}
                            listRoute = {this.state.listRoute}
                            listFavorites = {this.state.listFavorites}
                            myListRoute = {this.state.myListRoute}
                            selectOption = {this.state.selectOption}
                            exit = {this.exit}
                            refresh = {this.refresh}
                            handleState = {this.handleState}
                            searchInput = {this.state.searchInput}
                            search = {this.search}
                            searchRoutes = {this.state.searchRoutes}
                        />
                    </div>
                    <div className="SecondBlock">
                        <RouteInfoView
                            textRouteName= {this.state.textRouteName}
                            textRouteCategory= {this.state.textRouteCategory}
                            textRouteDest= {this.state.textRouteDest}
                            favorite = {this.state.favorite}
                            handleCheckboxFavorite = {this.handleCheckboxFavorite}
                            commentTextarea = {this.state.commentTextarea}
                            addComment = {this.addComment}
                            handleState = {this.handleState}
                            checkedRouteId = {this.state.checkedRouteId}
                            rating = {this.state.rating}
                            handleRating = {this.handleRating}
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