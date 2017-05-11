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
        <i style={{fontSize: 18}}>Data From 2009-13, US Census American Community Survey   </i>
        <DropdownButton bsStyle='primary' title={capitalize(this.state.selectedLanguage)} onSelect={this.chooseLanguage}>
          <MenuItem eventKey='telugu'>Telugu</MenuItem>
          <MenuItem eventKey='tamil'>Tamil</MenuItem>
          <MenuItem eventKey='bengali'>Bengali</MenuItem>
        </DropdownButton><br/>
        <div className='mapbox'>
          <div className='info legend'>
            <b>Number of Speakers: </b>
            <div><i style={{backgroundColor: '#FFEDA0'}}></i> 0-100</div>
            <div><i style={{backgroundColor: '#FED976'}}></i> 100-500</div>
            <div><i style={{backgroundColor: '#FEB24C'}}></i> 500-1000</div>
            <div><i style={{backgroundColor: '#FD8D3C'}}></i> 1000-5000</div>
            <div><i style={{backgroundColor: '#FC4E2A'}}></i> 5000-10000</div>
            <div><i style={{backgroundColor: '#E31A1C'}}></i> 10000-20000</div>
            <div><i style={{backgroundColor: '#BD0026'}}></i> 20000-35000</div>
            <div><i style={{backgroundColor: '#800026'}}></i> 35000+</div>
          </div>
          <UnitedStatesMap selectedLanguage={this.state.selectedLanguage} />
        </div>
      </div>
    );
  }
}

export default App;
