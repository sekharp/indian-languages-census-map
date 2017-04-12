import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
// import L from 'leaflet'

class BaseMap extends Component {
  constructor(props){
    super(props)
    this.state = {
      lat: 39.742043,
      lng: -104.991531,
      zoom: 13,
    };
  }

  handleClick = () => {
    this.refs.map.leafletElement.locate();
  };

  handleLocationFound = e => {
    this.setState({
      hasLocation: true,
      latlng: e.latlng,
    });
  };

// http://api.census.gov/data/2013/language?get=EST,LANLABEL,NAME&for=state:08&LAN=701
  render() {
    const position = [this.state.lat, this.state.lng];
    const marker = this.state.hasLocation
      ? <Marker position={this.state.latlng}>
          <Popup>
            <span>You are here</span>
          </Popup>
        </Marker>
      : null;
    return (
      <div className="map-container">
        <Map
          className="map"
          center={(this.state.latlng || [39.750809, -104.996810])}
          zoom={20}
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
