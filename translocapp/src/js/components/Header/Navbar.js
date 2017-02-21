import React from "react";
import { Link, IndexLink } from 'react-router';

export default class Navbar extends React.Component {

  render() {
    return (
      <nav class="navbar navbar-default">
        <div class="container">
          <div class="navbar-header">
            <a class="navbar-brand" href="#">Translocatome</a>
          </div>
          <ul class="nav navbar-nav">
            <li><IndexLink to={`/`} activeClassName="active">home</IndexLink></li>
            <li><Link to={`/help`} activeClassName="active">help</Link></li>
            <li><Link to={`/search`} activeClassName="active">search</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}
