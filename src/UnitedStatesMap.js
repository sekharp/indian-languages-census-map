import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import geojson from './us-states.geojson';
// import L from 'leaflet'

class BaseMap extends Component {
  constructor(props){
    super(props)
    this.state = {
      lat: 39.742043,
      lng: -104.991531,
      zoom: 2,
      geojson: null
    };
  }

  componentDidMount() {
    this.setState({
      geojson
    });
  }

  handleClick = (e) => {
    this.setState({ latlng: e.latlng })
  };

// http://api.census.gov/data/2013/language?get=EST,LANLABEL,NAME&for=state:08&LAN=701
// var mapboxAccessToken = pk.eyJ1Ijoic2VraGFycCIsImEiOiJjajFtenRxOHMwMGU0MnFuMTQ5ZGpxZnUwIn0.grcMpc9MF2c9hd4WigV_0g;
// var map = L.map('map').setView([37.8, -96], 4);

// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
//     id: 'mapbox.light',
//     attribution: ...
// }).addTo(map);

// L.geoJson(statesData).addTo(map);
  render() {
    const position = [this.state.lat, this.state.lng];
    const marker = this.state.latlng
      ? <Marker position={this.state.latlng}>
          <Popup>
            <span>You clicked here</span>
          </Popup>
        </Marker>
      : null;
    return (
      <div className="map-container">
        <Map
          className="map"
          center={(this.state.latlng || [39.750809, -104.996810])}
          zoom={6}
          length={4}
          onClick={this.handleClick}
          onLocationfound={this.handleLocationFound}
          ref="map"
          maxBounds={[[85, 100],[-85, -280]]}
        >
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            maxZoom={10}
            minZoom={2}
          />
          <Marker position={position}>
            <Popup>
              <span>Telugu People in Denver <br/> Population: Sekhar</span>
            </Popup>
          </Marker>
          {marker}
        </Map>
      </div>
    );
  }
}

export default BaseMap;
