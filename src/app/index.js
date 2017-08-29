import React,{Component} from "react";
import {render} from "react-dom";

import AuthorizationSettings from "./components/authorization/AuthorizationSettings"
import Registration from "./components/registration/RegistrationSettings"
import UserPage from "./components/user/UserPage"

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

const history = createHistory();
const middleware = routerMiddleware(history);

function reducer(state=[], action) {
    switch (action.type) {
        case "USER_SUCCESS":
            return [...state, action.payload];
        default:
            return state;
    }
}

export const store = createStore(
    reducer,
    applyMiddleware(middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends Component {
    constructor(){
        super();
    }
    render(){
        return(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div>
                        <Route exact path="/" component={AuthorizationSettings}/>
                        <Route exact path="/registration" component={Registration}/>
                        <Route exact path="/user" component={UserPage}/>
                    </div>
                </ConnectedRouter>
            </Provider>
        );
    }
}
render(<App/>, window.document.getElementById("app"));