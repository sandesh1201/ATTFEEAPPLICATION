import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import OrderDetail from './order-detail/order-detail.jsx';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { createStore, applyMiddleware } from 'redux';
import { allReducers } from './allReducers.js';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './home';
// import {history} from './history'
// require('./') 
const handleRequest = (store) => (next) => (action) => {
  return next(action);
}

const dispatcher = (function () {
  let reduxDispatch = null;

  return {
      initialize: (d) => {
          reduxDispatch = d;
      },
      dispatch: (action) => {
          if (reduxDispatch) {
              reduxDispatch(action);
          }
      }
  };
}());

const configureProvider = function (component, reducer, preloadedState, isInlineComponent, ...middlewares) {
  const store = configureStore(reducer, preloadedState, middlewares);
  dispatcher.initialize(store.dispatch);
  const provider = (<Provider store={store}>{component}</Provider>);

  return { store, provider };
}

const configureStore = function (reducer, preloadedState, middlewares) {
    return createStore(
        reducer,
        preloadedState,
        applyMiddleware(
            ...middlewares,
            )
    );
};

function appInit() {
  const { provider } = configureProvider(
    <React.Fragment>
      <Router>
        <div className= "container-fluid">
        <App/>
      {/* <OrderDetail /> */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/order/:id" component={OrderDetail} />
        </Switch>
        </div>
      </Router>
    </React.Fragment>
  
  , combineReducers(allReducers),  {} , false, thunk, handleRequest);
  ReactDOM.render(provider,  document.getElementById('root'));
}
appInit();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
