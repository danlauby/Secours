import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { compose, withProps } from "recompose";


export default Map = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDvx6AYlUyLcXbZW96tfy_w0FDaU_AIJ-c&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={9} defaultCenter={{ lat: 45.6318,lng: -122.6716 }}>
    {props.markers.map((doctor, index) => {
          const marker = {
            position: { lat: doctor.location.lat, lng: doctor.location.lng },
            title: doctor.title
          }
          console.log('Markers', marker);
          return <Marker key={index} {...marker} />;
        })}
  </GoogleMap>
));

// class Map extends Component {
//   render() {
//     const markers = this.props.markers.map((doctor, index) => {
//       const marker = {
//         position: { lat: doctor.location.lat, lng: doctor.location.lng },
//         title: doctor.title
//       }
//       return <Marker key={index} {...marker} />;
//     });
//
//     console.log('markers', markers);
//
//     return (
//       <GoogleMap
//         defaultCenter={this.props.defaultCenter}
//         center={this.props.center}
//         zoom={this.props.zoom}
//       >
//         {markers}
//       </GoogleMap>
//     );
//   }
// }
//
// Map.propTypes = {
//   markers: PropTypes.array.isRequired,
//   defaultCenter: PropTypes.object.isRequired,
//   center: PropTypes.object.isRequired,
//   zoom: PropTypes.number.isRequired
// }

// export default withScriptjs(withGoogleMap(Map));
