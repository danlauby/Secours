import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const DoctorItem = ({ doctors, index, listStyle }) => (
  <div>
    <img src={doctors[index].profile.image_url} style={listStyle}/>
    <Link
      to={{ pathname:`/doctor/${doctors[index].profile.first_name}-${doctors[index].profile.last_name}` }}>
      {doctors[index].profile.first_name} {doctors[index].profile.last_name} - {doctors[index].profile.title} <br />
    </Link>
    {doctors[index].specialties[0].actors}
    <hr />
  </div>
);

DoctorItem.propTypes = {
  doctors: PropTypes.array,
  index: PropTypes.number.isRequired,
  listStyle: PropTypes.object.isRequired
}

export default DoctorItem;
