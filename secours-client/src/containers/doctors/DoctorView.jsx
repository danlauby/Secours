import { connect } from 'react-redux';

import DoctorView from '../../components/doctors/DoctorView';


const mapStateToProps = (state) => {
  return {
    doctors: state.doctors.doctors
  };
};

const DoctorViewContainer = connect(
  mapStateToProps
)(DoctorView);

export default DoctorViewContainer;
