import "./index.css";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/:city" component={App}/>
        <Route path="/" component={App}/>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
