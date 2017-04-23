import React, { Component } from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import { L } from 'leaflet';

class BaseMap extends Component {
  constructor(props){
    super(props)
    this.state = {
      lat: 39.742043,
      lng: -104.991531,
      zoom: 1,
    };
  }

  style(feature) {
    var getColor = (d) => {
      return d > 39000 ? '#800026' :
             d > 20000  ? '#BD0026' :
             d > 10000  ? '#E31A1C' :
             d > 5000  ? '#FC4E2A' :
             d > 1000   ? '#FD8D3C' :
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

  highlightFeature(e) {
    // console.log(this)
    // this.refs.geojson.leafletElement.resetStyle(e.target);
    // var layer = e.target;

    // layer.setStyle({
    //   weight: 5,
    //   color: '#666',
    //   dashArray: '',
    //   fillOpacity: 0.7
    // });

    // if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    //   layer.bringToFront();
    // }
  }

  // resetHighlight(e) {
  //   geojson.resetStyle(e.target);
  // }

  // zoomToFeature(e) {
  //   map.fitBounds(e.target.getBounds());
  // }

  onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.name) {
        layer.bindPopup(feature.properties.name);
    }
  }

  render() {
    console.log(this.props.languageData)
    return (
      <div className="map-container">
        <Map
          className="map"
          center={(this.state.latlng || [39.750809, -104.996810])}
          zoom={4}
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
            data={this.props.languageData}
            style={this.style}
            onEachFeature={this.onEachFeature}
          />
        </Map>
      </div>
    );
  }
}

export default BaseMap;
