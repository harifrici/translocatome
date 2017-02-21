import React from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Home",
    };
  }

  changeTitle(title) {
    this.setState({title});
  }

  render() {
    return (
      <div>
        <section style={{backgroundColor: 'red'}}>
          <h1>TRANSLOCATOME PROJECT</h1>
          <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
        </section>
        <section style={{backgroundColor: 'blue'}}>
          <h1>STATISTICS</h1>
          <div>300 ilyen fehérje<br></br>
              250 amolyan fehérje<br></br>
              16 izé
          </div>
        </section>
        <section style={{backgroundColor: 'green'}}>
          <h1>HEELP</h1>
          <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
        </section>
        <section style={{backgroundColor: 'yellow'}}>
          <h1>MEG MÉG EGYÉB DOLGOK</h1>
          <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
        </section>
      </div>
    );
  }
}
