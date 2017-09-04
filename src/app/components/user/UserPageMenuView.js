import React,{Component} from "react";

import "./styles.css";

export default class UserPageMenuView extends Component {
    render(){
        return(
            <div className="overflow">
            <div className="nav-side-menu">
                <div className="brand"><i className="fa fa-google-wallet fa-lg"></i> Hi, {this.props.userInfo.email}</div>
                <div className="menu-list">
                    <ul id="menu-content" className="menu-content collapse out">
                        <li  data-toggle="collapse" data-target="#favoriteRoutes" className="collapsed active">
                            <a href="#"><i className="fa fa-star fa-lg"></i> Favorite routes <span className="arrow"></span></a>
                        </li>
                        <ul className="sub-menu collapse show" id="favoriteRoutes">
                            {this.props.listFavorites}
                        </ul>
                        <li  data-toggle="collapse" data-target="#routesList" className="collapsed active">
                            <a href="#"><i className="fa fa-list fa-lg"/>All Routes <span className="arrow"/></a>
                        </li>
                        <ul className="sub-menu collapse" id="routesList">
                            {this.props.listRoute}
                        </ul>
                        <li  data-toggle="collapse" data-target="#myRoutesList" className="collapsed active">
                            <a href="#"><i className="fa fa-list fa-lg"/>My Routes <span className="arrow"/></a>
                        </li>
                        <ul className="sub-menu collapse" id="myRoutesList">
                            {this.props.myListRoute}
                        </ul>
                        <li  data-toggle="collapse" data-target="#addRoute" className="collapsed active">
                            <a href="#"><i className="fa fa-plus fa-lg"/> Add Route<span className="arrow"/></a>
                        </li>
                        <ul className="sub-menu collapse" id="addRoute">
                            <div className="blockIn">
                                <input type="text" className="form-control inputName" placeholder="Route name"
                                       value={this.props.routeName} onChange={(e)=>this.props.handleState(e,"routeName")}
                                />
                                <select className="custom-select mb-2 mr-sm-2 mb-sm-0 selectView" id="inlineFormCustomSelect"
                                        value={this.props.routeCategory} onChange={(e)=>this.props.handleState(e,"routeCategory")}
                                >
                                    <option value={"0"} disabled selected>Select your category</option>
                                    {this.props.selectOption}
                                </select>
                                <textarea className="form-control textareaView" id="exampleTextarea" rows="3" placeholder="Description"
                                    value={this.props.routeDest} onChange={(e)=>this.props.handleState(e,"routeDest")}
                                >
                                </textarea>
                                <button type="submit" className="btn btn-primary btn-sm btn-block ButtonStyle"
                                        onClick={this.props.addRoute}
                                >Add Route</button>
                            </div>
                        </ul>
                        <li  data-toggle="collapse" data-target="#addCategory" className="collapsed active">
                            <a href="#"><i className="fa fa-plus fa-lg"></i> Add Category <span className="arrow"></span></a>
                        </li>
                        <ul className="sub-menu collapse" id="addCategory">
                            <div className="blockIn">
                                <input type="text" className="form-control inputCategory" placeholder="Category Name"
                                       value={this.props.inputCategoryName} onChange={(e)=>this.props.handleState(e,"inputCategoryName")}
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
                            {this.props.listCategory}
                        </ul>
                        <li  data-toggle="collapse" data-target="#search" className="collapsed active">
                            <a href="#"><i className="fa fa-search fa-lg"/>Search<span className="arrow"/></a>
                        </li>
                        <ul className="sub-menu collapse" id="search">
                            <div className="p-3">
                            <div id="imaginary_container">
                                <div className="input-group stylish-input-group">
                                    <input type="text" className="form-control"  placeholder="Search"
                                        value={this.props.searchInput} onChange={(e)=>this.props.search(e,"input")}
                                    />
                                        <span className="input-group-addon">
                                                <span className="fa fa-search"/>
                                        </span>
                                </div>
                            </div>
                            <select className="custom-select mb-2 mr-sm-2 mb-sm-0 selectView" id="inlineFormCustomSelect"
                                    value={this.props.routeCategory} onChange={(e)=>this.props.search(e,"select")}
                            >
                                <option value={"0"} disabled selected>Select your category</option>
                                {this.props.selectOption}
                            </select>
                                </div>
                            <div className="searchRoutes">
                                {this.props.searchRoutes}
                            </div>
                        </ul>
                        <li onClick={this.props.exit}>
                            <a href="#">
                                <i className="fa fa-times fa-lg"></i> Exit
                            </a>
                        </li>
                        <div className="refreshButton">
                            <button type="submit" className="btn btn-primary btn-sm btn-block ButtonStyle"
                                    onClick={this.props.refresh}
                            >Refresh route</button>
                        </div>
                    </ul>
                </div>
            </div>
            </div>
        );
    }
}