import React, { Component } from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import { statesData } from './us-states.js';
import { map, findIndex, capitalize } from 'lodash';

class BaseMap extends Component {
  constructor(props){
    super(props)
    this.state = {
      lat: 39.742043,
      lng: -104.991531,
      zoom: 1,
      languageData: {}
    };
  }

  fetchCensusData(selectedLanguage) {
    let urls = [];
    // languages that don't initially work, need LAN39 data, guju, hindi, urdu 
    var languageCodeMap = { 
      'hindi': 663, 'bengali': 664, 'panjabi': 665, 'marathi': 666,
      'gujarathi': 667, 'bihari': 668, 'rajasthani': 669, 'oriya': 670,
      'urdu': 671, 'assamese': 672, 'kashmiri': 673, 'sindhi': 675,
      'telugu': 701, 'kannada': 702, 'malayalam': 703, 'tamil': 704 }
    var languageCode = languageCodeMap[selectedLanguage];
    map(statesData.features, (feature) => {
      var url = `https://api.census.gov/data/2013/language?get=EST,LANLABEL,NAME&for=state:` +
                `${feature.id}&LAN=${languageCode}&key=${process.env.REACT_APP_SECRET}`;
      urls.push(url)
      return feature
    })
    let languageData = [];
    var promises = urls.map(url => fetch(url).then(r => {
      if (r.status === 204) {
        var stateId = url.substring(url.indexOf('state:') + 6).substring(0, 2)
        return [[], [null, null, null, null, stateId]]
      } else {
        return r.json()
      }
    }));
    Promise.all(promises).then(results => {
      languageData = map(results, (result) => result[1]);
      var finalData = map(statesData.features, (feature) => {
        var index = findIndex(languageData, (s) => { return s[4] === feature.id; });
        feature.properties.population = languageData[index][0];
        feature.properties.language   = selectedLanguage;
        return feature
      })
      this.setState({ languageData: { type: 'FeatureCollection', features: finalData } })
    })
  }

  componentWillMount() {
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
    var popupForFeature = (feature) => {
      var population = feature.properties.population;
      var state = feature.properties.name;
      var language = feature.properties.language;
      var popup = '<b>' + state + '</b><br/>' +
                  capitalize(language) + ': ' +
                  (population == null ? 'N/A' : population);
      return popup
    }
    if (feature.properties && feature.properties.name) {
      layer.bindPopup('');
      layer.on('mouseover', function (e) {
        this.setPopupContent(popupForFeature(feature))
        this.openPopup();
        layer.setStyle({
          weight: 5,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7
        });
        layer.bringToFront();
      });
      layer.on('mouseout', function (e) {
        this.closePopup();
        layer.setStyle({
          weight: 2,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7
        });
      });
    }
  }

  render() {
    return (
      <div className='map-container'>
        <Map
          className='map'
          center={(this.state.latlng || [39.750809, -104.996810])}
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

export default BaseMap;
