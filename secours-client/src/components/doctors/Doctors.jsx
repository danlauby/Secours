import React from "react";
import PropTypes from 'prop-types';

import Button from '../Button';
import DoctorItem from './DoctorItem';


class Doctors extends React.Component {
  render() {
    const { doctors, fetchDoctors } = this.props;
    return (
      <div className="container">
        <Button
          onClick={fetchDoctors}
          text={'Find Doctors'}
          className={'btn btn-primary btn-lg'}
          />
        <div id={'doctor-list'} className="row">
          <div className="list-group col-md-12">
            {Object.values(doctors).map((doctor, index) => {
              return <DoctorItem
                key={index}
                doctor={doctor}
                />
            })}
          </div>
        </div>
      </div>
    );
  }
}

Doctors.propTypes = {
  fetchDoctors: PropTypes.func.isRequired
}

export default Doctors;
