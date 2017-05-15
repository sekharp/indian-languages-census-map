import React, { Component } from 'react';
import UnitedStatesMap from './UnitedStatesMap.js';
import './App.css';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { capitalize, includes } from 'lodash';
import { languageCodeMap } from './languageCodeMap';

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedLanguage: 'telugu',
      nationwideSpeakers: '247,760',
    };
  }

  chooseLanguage = (selectedLanguage) => {
    var languageCode = languageCodeMap[selectedLanguage];
    let url = '';
    if (includes(['hindi', 'gujarati', 'urdu'], selectedLanguage)) {
      url = `https://api.census.gov/data/2013/language?get=EST,LAN,LANLABEL,NAME&for=US` +
                `&LAN39=${languageCode}&key=${process.env.REACT_APP_SECRET}`;
    } else {
      url = `https://api.census.gov/data/2013/language?get=EST,LAN,LANLABEL,NAME&for=US` +
                `&LAN=${languageCode}&key=${process.env.REACT_APP_SECRET}`;
    }
    var promise = fetch(url).then(r => {
      if (r.status === 204) {
        return [[], [0, null, null, null, null]]
      } else {
        return r.json()
      }
    })
    return Promise.resolve(promise).then(result => {
      const nationwideSpeakers = numberWithCommas(result[1][0]);
      this.setState({ nationwideSpeakers: nationwideSpeakers, selectedLanguage: selectedLanguage })
    });
  }

  render() {
    return (
      <div className="App">
        <h2>Indian Languages US Census Map</h2>
        <div className='language-selector'>
          <b style={{fontSize: 16}}>Choose Language:&nbsp; </b>
          <DropdownButton bsStyle='default' id='dropdown' title={capitalize(this.state.selectedLanguage)} onSelect={this.chooseLanguage}>
            <MenuItem eventKey='hindi'>Hindi</MenuItem>
            <MenuItem eventKey='bengali'>Bengali</MenuItem>
            <MenuItem eventKey='punjabi'>Punjabi</MenuItem>
            <MenuItem eventKey='marathi'>Marathi</MenuItem>
            <MenuItem eventKey='gujarati'>Gujarati</MenuItem>
            <MenuItem eventKey='bihari'>Bihari</MenuItem>
            <MenuItem eventKey='rajasthani'>Rajasthani</MenuItem>
            <MenuItem eventKey='oriya'>Oriya</MenuItem>
            <MenuItem eventKey='urdu'>Urdu</MenuItem>
            <MenuItem eventKey='assamese'>Assamese</MenuItem>
            <MenuItem eventKey='kashmiri'>Kashmiri</MenuItem>
            <MenuItem eventKey='nepali'>Nepali</MenuItem>
            <MenuItem eventKey='sindhi'>Sindhi</MenuItem>
            <MenuItem eventKey='telugu'>Telugu</MenuItem>
            <MenuItem eventKey='kannada'>Kannada</MenuItem>
            <MenuItem eventKey='malayalam'>Malayalam</MenuItem>
            <MenuItem eventKey='tamil'>Tamil</MenuItem>
          </DropdownButton>
          <b style={{fontSize: 16}}>&nbsp;  - &nbsp;{this.state.nationwideSpeakers} Speakers Nationwide</b>
        </div>

        <br/><br/>
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
          N/A - Unavailable, likely due to small size (anonymized), or zero speakers.<br/>
          <b>Data From 2009-13, US Census American Community Survey. 3,441,773 South Asian Americans Nationwide (2010 Census).</b><br/>
        </div>
      </div>
    );
  }
}

export default App;
