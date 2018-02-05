import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';



const DoctorItem = (props) => {
  const { doctor, match } = props;
    return (
      <li>
        <Link to={{ pathname: `${match.url}/${doctor.profile.first_name}-${doctor.profile.last_name}` }}>
          {doctor.profile.first_name} {doctor.profile.last_name}
        </Link>
      </li>
    )
  }

  DoctorItem.propTypes = {
    doctor: PropTypes.object.isRequired,
  };

  export default DoctorItem;
