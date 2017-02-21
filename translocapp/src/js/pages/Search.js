import React from "react";
import { Link, browserHistory } from 'react-router';

import Footer from "../components/Footer";
import Header from "../components/Header";

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      proteins: []
    };
  }

  componentDidMount(){
    if(this.state.proteins.length == 0){
      let _this = this;
      fetch('http://www.mocky.io/v2/5888f638250000ae04adcde9')
      .then(function(response) {
        console.log(response);
        return response.json()
      }).then(function(json) {
        _this.setState({
          proteins: json
        })
        console.log('parsed json', json)
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      });
    }
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({value});
  }

  handleClick(e) {
    browserHistory.push('/protein/'+e)
  }

  render() {
    return (
      <div class="container search">
        <h1>Search</h1>
        <div class="input-div">
          <input value={this.state.value} placeholder="Type a UniProtID here" onChange={this.handleChange.bind(this)} />
        </div>
        <div class="advanced-btn"><button class="btn">Advanced search</button></div>
        <h3>Results for {this.state.value}:</h3>
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
               <th>UniProt ID</th>
               <th>Major loc.</th>
               <th>Minor loc.</th>
               <th>Source</th>

            </tr>
          </thead>
          <tbody>
            {
              this.state.proteins.filter((e) => {
                if (e.UniProtID){
                  return e.UniProtID.indexOf(this.state.value) >= 0;
                }
                return true;
              }).map((e) => {
                return <tr class="table-row search-result" key={e.UniProtID + e.exp_sys + e.Minor_loc} onClick={() => this.handleClick(e.UniProtID)}>
                  <td class="table-cell">{e.UniProtID}</td>
                  <td class="table-cell">{e.Major_loc}</td>
                  <td class="table-cell">{e.Minor_loc}</td>
                  <td class="table-cell">{e.src}</td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}
