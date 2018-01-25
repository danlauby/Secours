import { connect } from 'react-redux';
import { fetchDoctors } from "./../actions/doctorsActions";

import DoctorView from './../components/doctors/DoctorView';

const mapStateToProps = (state) => {
  return {
    doctors: state.doctors.doctors
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDoctors: () => {
      dispatch(fetchDoctors());
    }
  };
};

const DoctorViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DoctorView);

export default DoctorViewContainer;
