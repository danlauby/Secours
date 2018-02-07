import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const DoctorItem = ({ doctor }) => (
  <div>
    <Link
      to={{ pathname:`/doctor/${doctor.profile.first_name}-${doctor.profile.last_name}` }}>
      {doctor.profile.first_name} {doctor.profile.last_name}
    </Link>
  </div>
);

DoctorItem.propTypes = {
  doctors: PropTypes.array
}

export default DoctorItem;
