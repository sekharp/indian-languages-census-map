import React, { Component } from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import { statesData } from './us-states.js';
// import L from 'leaflet'

class BaseMap extends Component {
  constructor(props){
    super(props)
    this.state = {
      lat: 39.742043,
      lng: -104.991531,
      zoom: 1,
      // geojson: null,
      // geojsonLayer: null,
      // map: null
    };
    // this.filterGeoJSONLayer = this.filterGeoJSONLayer.bind(this);
  }

  // componentDidMount() {
  //   this.setState({
  //     geojson: statesData
  //   });
  //   console.log(statesData)
  //   console.log(this.refs.map)
  // }

  // componentWillMount() {
  //   L.geoJSON(statesData).addTo(this.refs.map);
  // }

// http://api.census.gov/data/2013/language?get=EST,LANLABEL,NAME&for=state:08&LAN=701
// var mapboxAccessToken = pk.eyJ1Ijoic2VraGFycCIsImEiOiJjajFtenRxOHMwMGU0MnFuMTQ5ZGpxZnUwIn0.grcMpc9MF2c9hd4WigV_0g;
// var map = L.map('map').setView([37.8, -96], 4);

// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
//     id: 'mapbox.light',
//     attribution: ...
// }).addTo(map);

  render() {
    return (
      <div className="map-container">
        <Map
          className="map"
          center={(this.state.latlng || [39.750809, -104.996810])}
          zoom={6}
          length={4}
          ref="map"
          maxBounds={[[85, 100],[-85, -280]]}
        >
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            maxZoom={10}
            minZoom={2}
          />
          <GeoJSON
            data={statesData}
          />
        </Map>
      </div>
    );
  }
}

export default BaseMap;
