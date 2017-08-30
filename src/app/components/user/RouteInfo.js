import React,{Component} from "react";

import "./styles.css";

import {push} from 'react-router-redux';
import {store} from '../../index';

export default class RouteInfo extends Component {
    render(){
        return(
            <div className="card">
                <div className="card-header">
                    {this.props.textRouteName}
                    <i onClick={()=>this.props.closeRouteInfo()} className="fa fa-times fa-lg closeRouteInfo"/>
                </div>
                <div className="card-block">
                    <h5 className="card-title">Category: {this.props.textRouteCategory}</h5>
                    <p className="card-text">
                        {"\n"}
                        {this.props.textRouteDest}
                    </p>
                    <label className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input"/>
                            <span className="custom-control-indicator"/>
                            <span className="custom-control-description">Favorite route</span>
                    </label>
                    <textarea className="form-control textareaView" id="commentTextarea" rows="3" placeholder="Comment"
                    >
                                </textarea>
                    <button type="submit" className="btn btn-primary btn-sm btn-block ButtonStyle"
                    >Add comment</button>
                </div>
            </div>
        );
    }
}