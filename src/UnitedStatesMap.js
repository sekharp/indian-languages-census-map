import React, { Component } from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import { statesData } from './us-states.js';
import { map, findIndex, capitalize, includes } from 'lodash';
import { languageCodeMap } from './languageCodeMap';

const popupForFeature = (feature) => {
  var population = feature.properties.population;
  var state = feature.properties.name;
  var language = feature.properties.language;
  var popup = '<b>' + state + '</b><br/>' +
              capitalize(language) + ': ' +
              (population == null ? 'N/A' : population);
  return popup
}

class UnitedStatesMap extends Component {
  constructor(props){
    super(props)
    this.state = {
      zoom: 1,
      languageData: statesData,
    };
  }

  buildUrls(selectedLanguage) {
    var languageCode = languageCodeMap[selectedLanguage];
    let urls = [];
    map(statesData.features, (feature) => {
      let url = '';
      if (includes(['hindi', 'gujarati', 'urdu'], selectedLanguage)) {
        url = `https://api.census.gov/data/2013/language?get=EST,LAN,LANLABEL,NAME&for=state:` +
                  `${feature.id}&LAN39=${languageCode}&key=${process.env.REACT_APP_SECRET}`;
      } else {
        url = `https://api.census.gov/data/2013/language?get=EST,LAN,LANLABEL,NAME&for=state:` +
                  `${feature.id}&LAN=${languageCode}&key=${process.env.REACT_APP_SECRET}`;
      }
      urls.push(url)
      return feature
    })
    return urls;
  }

  buildPromises(urls) {
    var promises = urls.map(url => fetch(url).then(r => {
      if (r.status === 204) {
        var stateId = url.substring(url.indexOf('state:') + 6).substring(0, 2)
        return [[], [null, null, null, null, null, stateId]]
      } else {
        return r.json()
      }
    }));
    return promises;
  }

  fetchCensusData(selectedLanguage) {
    var urls = this.buildUrls(selectedLanguage);
    var promises = this.buildPromises(urls);

    let languageData = [];
    Promise.all(promises).then(results => {
      languageData = map(results, (result) => result[1]);
      var censusData = map(statesData.features, (feature) => {
        var index = findIndex(languageData, (s) => { return s[5] === feature.id; });
        feature.properties.population = languageData[index][0];
        feature.properties.language   = selectedLanguage;
        return feature
      })
      this.setState({ languageData: { type: 'FeatureCollection', features: censusData } })
    })
  }

  componentDidMount() {
    this.fetchCensusData(this.props.selectedLanguage);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchCensusData(nextProps.selectedLanguage);
  }

  style(feature) {
    var getColor = (d) => {
      return d > 35000 ? '#800026' :
             d > 20000 ? '#BD0026' :
             d > 10000 ? '#E31A1C' :
             d > 5000  ? '#FC4E2A' :
             d > 1000  ? '#FD8D3C' :
             d > 500   ? '#FEB24C' :
             d > 100   ? '#FED976' :
                         '#FFEDA0';
    }

    return {
      fillColor: getColor(feature.properties.population),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  }

  onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.name) {
      layer.bindPopup(popupForFeature(feature));
      function layerStyle(over) {
        let colorForMouseEvent = over ? 'black' : 'white';
        let dashArrayForMouseEvent = over ? '' : '3';
        return { weight: 2, color: colorForMouseEvent, dashArray: dashArrayForMouseEvent, fillOpacity: 0.7 }
      }
      layer.on('mouseover', function (e) {
        this.setPopupContent(popupForFeature(feature))
        this.openPopup();
        layer.setStyle(layerStyle(true));
        layer.bringToFront();
      });
      layer.on('mouseout', function (e) {
        this.closePopup();
        layer.setStyle(layerStyle(false));
      });
    }
  }

  render() {
    return (
      <div className='map-container'>
        <Map
          className='map'
          center={[38, -98]}
          zoom={4}
          length={4}
          ref='map'
          maxBounds={[[85, 100],[-85, -280]]}
        >
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            maxZoom={10}
            minZoom={2}
          />
          <GeoJSON
            key={this.props.selectedLanguage}
            data={this.state.languageData}
            style={this.style}
            onEachFeature={this.onEachFeature}
          />
        </Map>
      </div>
    );
  }
}

export default UnitedStatesMap;
