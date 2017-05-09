import React, { Component } from 'react';
import UnitedStatesMap from './UnitedStatesMap.js';
import './App.css';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { capitalize } from 'lodash';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedLanguage: 'bengali'
    };
  }

  chooseLanguage = (event) => {
    this.setState({ selectedLanguage: event })
  }

  render() {
    return (
      <div className="App">
        <h1>Indian Languages US Census Map</h1>
        <h3><i>Data From 2009-13, US Census American Community Survey</i></h3>
        <DropdownButton bsStyle='primary' title={capitalize(this.state.selectedLanguage)} onSelect={this.chooseLanguage}>
          <MenuItem eventKey='telugu'>Telugu</MenuItem>
          <MenuItem eventKey='tamil'>Tamil</MenuItem>
          <MenuItem eventKey='bengali'>Bengali</MenuItem>
        </DropdownButton>
        <UnitedStatesMap selectedLanguage={this.state.selectedLanguage} />
      </div>
    );
  }
}

export default App;
