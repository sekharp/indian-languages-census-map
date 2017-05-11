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
        <i style={{fontSize: 18}}>Data From 2009-13, US Census American Community Survey</i><br/><br/>
        <div className='mapbox'>
          <UnitedStatesMap selectedLanguage={this.state.selectedLanguage} />
          <div className='info legend'>
            <b>Number of Speakers</b><br/>
            <i style={{backgroundColor: '#FFEDA0'}}></i> 0-100<br/>
            <i style={{backgroundColor: '#FED976'}}></i> 100-500<br/>
            <i style={{backgroundColor: '#FEB24C'}}></i> 500-1000<br/>
            <i style={{backgroundColor: '#FD8D3C'}}></i> 1000-5000<br/>
            <i style={{backgroundColor: '#FC4E2A'}}></i> 5000-10000<br/>
            <i style={{backgroundColor: '#E31A1C'}}></i> 10000-20000<br/>
            <i style={{backgroundColor: '#BD0026'}}></i> 20000-35000<br/>
            <i style={{backgroundColor: '#800026'}}></i> 35000+<br/><br/>
            N/A - Unavailable, likely due to small size (anonymized), or zero<br/><br/>
            <b>Choose Language</b><br/>
            <DropdownButton bsStyle='primary' title={capitalize(this.state.selectedLanguage)} onSelect={this.chooseLanguage}>
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
            </DropdownButton><br/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
