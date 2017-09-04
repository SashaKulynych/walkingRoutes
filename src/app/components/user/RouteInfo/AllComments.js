import React,{Component} from "react";
import "../styles.css";
import {fetchName} from '../requestFunction';
export default class AllComments extends Component {
    constructor(props){
        super(props);
        this.commentsView = this.commentsView.bind(this);
    }
    commentsView(){
        let http = new XMLHttpRequest();
        let resourceList='';
        let url = 'http://localhost:3000/comments?route='+this.props.checkedRouteId;
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
                <ul className="list-group mt-3" key={data.id}>
                    <div className="text-right">{data.date}</div>
                    <li className="list-group-item">User: {fetchName(data.user,"users","email")}</li>
                    <li className="list-group-item">Description: {data.description}</li>
                    <li className="list-group-item">Rating: {data.rating}</li>
                </ul>
            );
        });
        return listView;
    }
    render(){
        return(
            <div>
                {this.commentsView()}
            </div>
        );
    }
}