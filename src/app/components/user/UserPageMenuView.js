import React,{Component} from "react";

import "./styles.css";

import {push} from 'react-router-redux';
import {store} from '../../index';

export default class UserPageMenuView extends Component {
    render(){
        return(
            <div className="nav-side-menu">
                <div className="brand">Walking Routes</div>
                <div className="menu-list">
                    <ul id="menu-content" className="menu-content collapse out">
                        <li  data-toggle="collapse" data-target="#favoriteRoutes" className="collapsed active">
                            <a href="#"><i className="fa fa-star fa-lg"></i> Favorite routes <span className="arrow"></span></a>
                        </li>
                        <ul className="sub-menu collapse show" id="favoriteRoutes">
                            <li><a href="#">General</a></li>
                        </ul>
                        <li  data-toggle="collapse" data-target="#routesList" className="collapsed active">
                            <a href="#"><i className="fa fa-list fa-lg"></i> Routes List <span className="arrow"></span></a>
                        </li>
                        <ul className="sub-menu collapse" id="routesList">
                            <li><a href="#">General</a></li>
                        </ul>
                        <li  data-toggle="collapse" data-target="#addRoute" className="collapsed active">
                            <a href="#"><i className="fa fa-plus fa-lg"></i> Add Route<span className="arrow"></span></a>
                        </li>
                        <ul className="sub-menu collapse" id="addRoute">
                            <div className="blockIn">
                                <input type="text" className="form-control inputName" placeholder="Route name" />
                                <select className="custom-select mb-2 mr-sm-2 mb-sm-0 selectView" id="inlineFormCustomSelect">
                                    <option selected>Choose category</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                                <textarea className="form-control textareaView" id="exampleTextarea" rows="3" placeholder="Description"></textarea>
                                <button type="submit" className="btn btn-primary btn-sm btn-block ButtonStyle">Add Route</button>
                            </div>
                        </ul>
                        <li  data-toggle="collapse" data-target="#addCategory" className="collapsed active">
                            <a href="#"><i className="fa fa-plus fa-lg"></i> Add Category <span className="arrow"></span></a>
                        </li>
                        <ul className="sub-menu collapse" id="addCategory">
                            <div className="blockIn">
                                <input type="text" className="form-control inputCategory" placeholder="Category Name"
                                       value={this.props.inputCategoryName} onChange={this.props.handleInputCategoryName}
                                />
                                <button type="submit" className="btn btn-primary btn-sm btn-block ButtonStyle"
                                        onClick={this.props.addCategory}
                                >Add Category</button>
                            </div>
                        </ul>
                        <li  data-toggle="collapse" data-target="#categories" className="collapsed active">
                            <a href="#"><i className="fa fa-list-ol fa-lg"></i> Categories <span className="arrow"></span></a>
                        </li>
                        <ul className="sub-menu collapse" id="categories">
                            {this.props.categoriesList()}
                        </ul>
                        <button type="submit" className="btn btn-primary btn-sm btn-block ButtonStyle">Refresh route</button>
                        <li onClick={this.props.exit}>
                            <a href="#">
                                <i className="fa fa-times fa-lg"></i> Exit
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}