import React, { Component } from 'react';
import UnitedStatesMap from './UnitedStatesMap.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Indian Languages US Census Map</h1>
        <h3><i>Data From 2009-13, US Census American Community Survey</i></h3>
        <UnitedStatesMap />
      </div>
    );
  }
}

export default App;
