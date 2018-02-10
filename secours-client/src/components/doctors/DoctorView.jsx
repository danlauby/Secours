import React from 'react';
import PropTypes from 'prop-types';

const DoctorView = ({ doctors, match }) => {

  const doctor = doctors.find(doctor => `${doctor.profile.first_name}-${doctor.profile.last_name}` === match.params.name);

  if (!doctor) {
    return null;
  }

  const locations = doctor.practices.filter((arr, index, self) =>
  index === self.findIndex((practice) => (practice.lat === arr.lat && practice.lon === arr.lon
  ))).map((location, index) => {
    return (
      <div key={index} className="col-md-6">
        <hr />
        <address>
          <strong>{location.name}</strong><br />
          {location.visit_address.street}, {location.visit_address.street2}<br />
        {location.visit_address.city}, {location.visit_address.state} {location.visit_address.zip}<br />
      <a href={location.website}>{location.website}</a>
      <p>Distance: {location.distance.toFixed(2)} miles away</p>
      <p>Accepting new patients: {(location.accepts_new_patients === true) ? <span>Yes</span> : <span>No</span>}</p>
    </address>
  </div>
)
});

return (
  <div className="container">
    {doctor ?
      <div className='row'>
        <div className="col-md-4">
          <br />
          <img src={doctor.profile.image_url} alt={"Dr." + doctor.profile.first_name + " " + doctor.profile.last_name} />
        </div>
        <br />
        <div className="col-md-8">
          <br />
          <h2><strong>{doctor.profile.first_name} {doctor.profile.last_name}</strong> - {doctor.profile.title}</h2>
          <p>Gender: {doctor.profile.gender}</p>
          <p>Specialty:</p>
          <ul>
            {Object.entries(doctor.specialties).map(([index, specialty]) => {
              return <li key={index} id={index}>{specialty.actors}</li>;
              })}
          </ul>
          <p>Licenced in:</p>
          <ul>
            {Object.entries(doctor.licenses).map(([index, license]) => {
              return <li key={index} id={index}>{license.state}</li>;
              })}
          </ul>
            <p>Languages:</p>
            <ul>
              {Object.entries(doctor.profile.languages).map(([index, language]) => {
                return <li key={index} id={index}>{language.name}</li>;
                })}
            </ul>

            </div>
            <hr />
            <div className="row doctor-bio">
              <div className="col-md-12">
                <br />
                <h3>Bio</h3>
                <p>{doctor.profile.bio}</p>
              </div>
            </div>
            <div className="row doctor-locations">
              <br />
              <h3>Locations</h3>
              {locations}
            </div>
          </div>
          : <h2>Doctor not found</h2>
      }
    </div>
  );
};

DoctorView.propTypes = {
  doctors: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired
}

export default DoctorView;
