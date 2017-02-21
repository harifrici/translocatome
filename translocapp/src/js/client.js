import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

import Layout from "./pages/Layout";
import Search from "./pages/Search";
import Home from "./pages/Home";
import Help from "./pages/Help";
import Protein from "./pages/Protein";

const app = document.getElementById('app');
ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path="help" component={Help}></Route>
      <Route path="search" component={Search}></Route>
      <Route path="protein/:id" component={Protein}></Route>
    </Route>
  </Router>
, app);
