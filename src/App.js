import React, { Component } from 'react';
import UnitedStatesMap from './UnitedStatesMap.js';
import './App.css';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { capitalize } from 'lodash';

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
        <b style={{fontSize: 16}}>Choose Language</b><br/>
        <DropdownButton bsStyle='primary' id='dropdown' title={capitalize(this.state.selectedLanguage)} onSelect={this.chooseLanguage}>
          <MenuItem eventKey='hindi'>Hindi</MenuItem>
          <MenuItem eventKey='bengali'>Bengali</MenuItem>
          <MenuItem eventKey='panjabi'>Punjabi</MenuItem>
          <MenuItem eventKey='marathi'>Marathi</MenuItem>
          <MenuItem eventKey='gujarathi'>Gujarati</MenuItem>
          <MenuItem eventKey='bihari'>Bihari</MenuItem>
          <MenuItem eventKey='rajasthani'>Rajasthani</MenuItem>
          <MenuItem eventKey='oriya'>Oriya</MenuItem>
          <MenuItem eventKey='urdu'>Urdu</MenuItem>
          <MenuItem eventKey='assamese'>Assamese</MenuItem>
          <MenuItem eventKey='kashmiri'>Kashmiri</MenuItem>
          <MenuItem eventKey='sindhi'>Sindhi</MenuItem>
          <MenuItem eventKey='telugu'>Telugu</MenuItem>
          <MenuItem eventKey='kannada'>Kannada</MenuItem>
          <MenuItem eventKey='malayalam'>Malayalam</MenuItem>
          <MenuItem eventKey='tamil'>Tamil</MenuItem>
        </DropdownButton><br/><br/>
        <UnitedStatesMap selectedLanguage={this.state.selectedLanguage} /><br/>
        <div className='info legend'>
          <b>Number of Speakers</b><br/>
          <div><i style={{backgroundColor: '#FFEDA0'}}></i><br/>0-100</div>
          <div><i style={{backgroundColor: '#FED976'}}></i><br/>100-500</div>
          <div><i style={{backgroundColor: '#FEB24C'}}></i><br/>500-1000</div>
          <div><i style={{backgroundColor: '#FD8D3C'}}></i><br/>1000-5000</div>
          <div><i style={{backgroundColor: '#FC4E2A'}}></i><br/>5000-10000</div>
          <div><i style={{backgroundColor: '#E31A1C'}}></i><br/>10000-20000</div>
          <div><i style={{backgroundColor: '#BD0026'}}></i><br/>20000-35000</div>
          <div><i style={{backgroundColor: '#800026'}}></i><br/>35000+</div>
          <br/>
          N/A - Unavailable, likely due to small size (anonymized), or zero speakers<br/>
          <b style={{fontStyle: 'italic', fontSize: '14px'}}>Data From 2009-13, US Census American Community Survey</b><br/>
        </div>
      </div>
    );
  }
}

export default App;
