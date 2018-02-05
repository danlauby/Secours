import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DoctorSearchForm from '../../containers/doctors/DoctorSearchForm';
import DoctorList from './DoctorList';
import Map from '../maps/Map';


class Doctors extends Component {

  state = {
    markers: [],
    isMarkerShown: false
  }

  componentDidMount() {
    this.getMarkers();
  }

  handleMapMounted(map) {
    this.map = map;
  }

  getMarkers = () => {
    let practices = this.props.doctors.map(function(doctor, index) {
      return {
        title: doctor.profile.first_name + ' ' + doctor.profile.last_name,
        location: {
          lat: doctor.practices[0].visit_address.lat,
          lng: doctor.practices[0].visit_address.lon
        }
      }
    });
    this.setState({ markers: practices, isMarkerShown: true });
  }

  render() {
    const { doctors, match } = this.props;

    return (
      <div>
        <DoctorSearchForm getMarkers={this.getMarkers} />
        <div className="row">
          <div className="col-md-4">
            <DoctorList doctors={doctors} match={match} />
          </div>
          <div className="col-md-8">
            <Map
              isMarkerShown={this.state.isMarkerShown}
              center={{ lat: 45.6318,lng: -122.6716 }}
              zoom={12}
              onMapMounted={this.handleMapMounted}
              markers={this.state.markers}
              />
          </div>
        </div>
      </div>
    );
  }
}

Doctors.propTypes = {
  doctors: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired
}

export default Doctors;
