import "./index.css";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import App from "./components/App";
import { Provider } from 'react-redux'
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux';
import reportWebVitals from "./reportWebVitals";
import rootReducer from '../src/reducers/index'

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/:city" component={App}/>
        <Route path="/" component={App}/>
      </Switch>
    </Router>
  </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
