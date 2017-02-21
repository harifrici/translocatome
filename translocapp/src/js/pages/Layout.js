import React from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Welcome",
    };
  }

  changeTitle(title) {
    this.setState({title});
  }

  render() {
    return (
      <div className="routerView">
        <Header changeTitle={this.changeTitle.bind(this)} title={this.state.title} />
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
