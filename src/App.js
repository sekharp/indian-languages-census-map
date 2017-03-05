import React, { Component } from 'react';
import UnitedStatesMap from './UnitedStatesMap.js';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state =  {
      telugu: {},
    };
  }

  componentWillMount(){
    fetch('http://api.census.gov/data/2013/language?get=EST,LANLABEL,NAME&for=state:06&LAN=701')
      .then((res) => {
        return res.json()
      }).then((res)=>{
        this.setState({
          telugu: res
        })
      })
  }

  render() {
    console.log(this.state.telugu)
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
