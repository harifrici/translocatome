import React from "react";

import Title from "./Header/Title";
import Navbar from "./Header/Navbar";

export default class Header extends React.Component {
  handleChange(e) {
    const title = e.target.value;
    this.props.changeTitle(title);
  }

  render() {
    return (
      <div>
        <Navbar />
      </div>
    );
  }
}
