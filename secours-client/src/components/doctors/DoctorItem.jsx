import React from 'react';
import PropTypes from 'prop-types';


class DoctorItem extends React.Component {
  render() {

    const { doctor } = this.props;

    const mappedSpecialties = Object.entries(doctor.specialties).map(([index, specialty]) => {
      return <li key={index} id={index}>{specialty.name}</li>;
      });

      return (
        <div>
          <ul>
            <li className="list-group-item justify-content-between">
              <a href="#">
                <img src={doctor.profile.image_url} alt={"Dr." + doctor.profile.first_name + " " + doctor.profile.last_name}/>
                <h5 className="mb-1">{doctor.profile.first_name} {doctor.profile.last_name}</h5>
                <ul>
                  {mappedSpecialties}
                </ul>
              </a>
            </li>
          </ul>
        </div>
      )
    }
  }

  DoctorItem.propTypes = {
    doctor: PropTypes.object.isRequired,
  };

  export default DoctorItem;
