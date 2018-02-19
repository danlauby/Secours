import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Jumbotron } from 'reactstrap';

import DoctorSearchForm from '../../containers/doctors/DoctorSearchForm';
import DoctorList from './DoctorList';
import MapDisplay from '../maps/MapDisplay';
import GeoLocationSearchForm from '../maps/GeoLocationSearchForm';


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
    const { doctors, fetchDoctors } = this.props;
    return (
      <Container fluid>
        <Row className="doctor-search">
          <Col xs={{ size: 6, offset: 3 }}>
            <GeoLocationSearchForm />
            <DoctorSearchForm getMarkers={this.getMarkers} />
          </Col>
        </Row>
        <Row>
          <Col xs="4">
            <DoctorList doctors={doctors} fetchDoctors={fetchDoctors}/>
          </Col>
          <Col xs="8" className="map">
            {doctors.length ?
              <MapDisplay
                isMarkerShown={this.state.isMarkerShown}
                center={{ lat: 45.6318,lng: -122.6716 }}
                zoom={12}
                markers={this.state.markers}
                />
              : ''
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

Doctors.propTypes = {
  doctors: PropTypes.array
}

export default Doctors;
