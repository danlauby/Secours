import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DoctorSearchForm from '../../containers/doctors/DoctorSearchForm';
import DoctorList from './DoctorList';
import Map from '../maps/Map';


class Doctors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      isMarkerShown: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.getMarkers(nextProps);
  }

  getMarkers = (props = this.props) => {
    let practices = props.doctors.map(function(doctor, index) {
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
    const { doctors } = this.props;
    return (
      <div className="container">
        <DoctorSearchForm getMarkers={this.getMarkers} />
        <div className="row">
          <div className="col-md-4">
            <DoctorList doctors={doctors} />
          </div>
          <div className="col-md-8">
            {doctors.length ?
              <Map
                isMarkerShown={this.state.isMarkerShown}
                center={{ lat: 45.6318,lng: -122.6716 }}
                zoom={12}
                markers={this.state.markers}
                />
              : ''
            }
          </div>
        </div>
      </div>
    );
  }
}

Doctors.propTypes = {
  doctors: PropTypes.array
}

export default Doctors;
