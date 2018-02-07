import React from "react";
import PropTypes from 'prop-types';

import DoctorItem from './DoctorItem';


const DoctorList = ({ doctors }) => {
  const linkList = doctors.map((doctor, index) => {
    return (
      <DoctorItem doctor={doctor} key={index} />
    );
  });

  return (
    <div>
      <ul>{linkList}</ul>
    </div>
  );
}

DoctorList.propTypes = {
  doctors: PropTypes.array.isRequired
}

export default DoctorList;
