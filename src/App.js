import React, { Component } from 'react';
import UnitedStatesMap from './UnitedStatesMap.js';
import './App.css';
import { statesData } from './us-states.js';
import { map, findIndex } from 'lodash';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      languageData: {}
    }
  }

  componentDidMount() {
    let urls = [];
    map(statesData.features, (feature) => {
      var url = `http://api.census.gov/data/2013/language?get=EST,LANLABEL,NAME&for=state:${feature.id}&LAN=701&key=${process.env.REACT_APP_SECRET}`;
      urls.push(url)
      return feature
    })
    let languageData = [];
    var promises = urls.map(url => fetch(url).then(r => r.json()));
    Promise.all(promises).then(results => {
      languageData = map(results, (result) => result[1]);
      var finalData = map(statesData.features, (feature) => {
        var index = findIndex(languageData, (s) => { return s[4] == feature.id; });
        feature.properties.population = languageData[index][0];
        return feature
      })
      this.setState({ languageData: { type: 'FeatureCollection', features: finalData } })
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Indian Languages US Census Map</h1>
        <h3><i>Data From 2009-13, US Census American Community Survey</i></h3>
        <UnitedStatesMap languageData={this.state.languageData}/>
      </div>
    );
  }
}

export default App;
