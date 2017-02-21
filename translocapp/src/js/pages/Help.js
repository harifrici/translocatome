import React from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";

export default class Help extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Search",
    };
  }

  changeTitle(title) {
    this.setState({title});
  }

  render() {
    return (
      <div>
        Help
      </div>
    );
  }
}
