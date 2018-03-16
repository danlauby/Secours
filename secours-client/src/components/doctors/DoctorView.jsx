import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

const DoctorView = ({ doctors, match }) => {

  const doctor = doctors.find(doctor => `${doctor.profile.first_name}-${doctor.profile.last_name}` === match.params.name);

  if (!doctor) {
    return null;
  }

  const locations = doctor.practices.filter((arr, index, self) =>
  index === self.findIndex((practice) => (practice.lat === arr.lat && practice.lon === arr.lon
  ))).map((location, index) => {
    return (
      <Col xs="3" key={index} className="location-card">
        <address>
          <strong>{location.name}</strong><br />
          {location.visit_address.street}, {location.visit_address.street2}<br />
        {location.visit_address.city}, {location.visit_address.state} {location.visit_address.zip}<br />
      <p>Distance: {location.distance.toFixed(2)} miles away</p>
      <p>Accepting new patients: {(location.accepts_new_patients === true) ? <span>Yes</span> : <span>No</span>}</p>
      <a href={location.website}>{location.website}</a>
    </address>
  </Col>
)
});

return (
  <div>
    <div className="doctor-header">
      <Row>
        <Col xs="4" className="doctor-img">
          <img src={doctor.profile.image_url} alt={"Dr." + doctor.profile.first_name + " " + doctor.profile.last_name} />
        </Col>
        <Col xs="8" className="doctor-stats">
          <h2>{doctor.profile.first_name} {doctor.profile.last_name} - <span>{doctor.profile.title}</span></h2>
          <p>Gender: {doctor.profile.gender}</p>
          <p>Specialty:
            {Object.entries(doctor.specialties).map(([index, specialty]) => {
              return <span key={index} id={index}>{specialty.actors}</span>;
              })}</p>
              <p>Licenced in:
                {Object.entries(doctor.licenses).map(([index, license]) => {
                  return <span key={index} id={index}>{license.state}</span>;
                  })}</p>
                  <p>Languages:
                    {Object.entries(doctor.profile.languages).map(([index, language]) => {
                      return <span key={index} id={index}>{language.name}</span>;
                      })}</p>
                    </Col>
                  </Row>
                </div>
                <Row className="doctor-bio">
                  <Col>
                    <h3>Bio:</h3>
                    <p>{doctor.profile.bio}</p>
                  </Col>
                </Row>
                <div className="doctor-locations">
                  <Row>
                    <Col>
                      <h3>Locations:</h3>
                      <Row>
                        {locations}
                      </Row>
                    </Col>
                  </Row>
                </div>
              </div>
            );
          };

          DoctorView.propTypes = {
            doctors: PropTypes.array.isRequired,
            match: PropTypes.object.isRequired
          }

          export default DoctorView;
