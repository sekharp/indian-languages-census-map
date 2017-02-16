import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer, LayersControl, Tooltip } from 'react-leaflet';
import L from 'leaflet'

class BaseMap extends Component {
  constructor(props){
    super(props)
    this.state =  {

    };
  }
  render() {
    return (
      <div className="map-container">
        <Map
          className="map"
          center={[39.750809, -104.996810]}
          zoom={4}
          maxBounds={[[85, 100],[-85, -280]]}
        >
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            maxZoom = {10}
            minZoom = {2}
          />
        </Map>
      </div>
    );
  }
}

export default BaseMap;
