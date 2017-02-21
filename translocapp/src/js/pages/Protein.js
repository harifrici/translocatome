import React from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";

export default class Protein extends React.Component {

  render() {
    return (
      <div>
        <h1>{this.props.params.id}</h1>
      </div>
    );
  }
}
