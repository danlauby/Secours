import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';


export default Map = compose(
  withProps({
    googleMapURL:
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyDvx6AYlUyLcXbZW96tfy_w0FDaU_AIJ-c&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style={{ height: `450px` }} />,
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
        return <Marker key={index} {...marker} />;
      })}
    </GoogleMap>
  ));


Map.propTypes = {
  markers: PropTypes.array.isRequired
}
