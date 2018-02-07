import React from 'react';
import PropTypes from 'prop-types';

const DoctorView = ({ doctors, match }) => {

  const doctor = doctors.find(doctor => `${doctor.profile.first_name}-${doctor.profile.last_name}` === match.params.name);

  return (
    <div>
      {doctor ?
        <div>
          <h2><strong>{doctor.profile.first_name} {doctor.profile.last_name}</strong> - {doctor.profile.title}</h2>

          <img src={doctor.profile.image_url} alt={"Dr." + doctor.profile.first_name + " " + doctor.profile.last_name} />

          <ul>{Object.entries(doctor.specialties).map(([index, specialty]) => {
              return <li key={index} id={index}>{specialty.description}</li>;
              })}</ul>

              <p>{doctor.profile.bio}</p>

        </div>
            : <h2>Doctor not found</h2>
        }
      </div>
    );
  }

  DoctorView.propTypes = {
    doctors: PropTypes.array.isRequired,
    match: PropTypes.object.isRequired
  }

  export default DoctorView;
