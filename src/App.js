import React, { Component } from 'react';
import UnitedStatesMap from './UnitedStatesMap.js';
import './App.css';
import { DropdownButton, MenuItem } from 'react-bootstrap';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedLanguage: 'telugu'
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
        <DropdownButton bsStyle='primary' title='Pick a Language' onSelect={this.chooseLanguage}>
          <MenuItem eventKey='telugu'>Telugu</MenuItem>
          <MenuItem eventKey='tamil'>Tamil</MenuItem>
          <MenuItem eventKey='gujurati'>Gujurati</MenuItem>
          <MenuItem eventKey='bengali'>Bengali</MenuItem>
        </DropdownButton>
        <UnitedStatesMap selectedLanguage={this.state.selectedLanguage} />
      </div>
    );
  }
}

export default App;
