import { connect } from 'react-redux';
import { fetchDoctors } from "../../actions/doctorsActions";

import DoctorList from '../../components/doctors/DoctorList';


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

const DoctorsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DoctorList);

export default DoctorsContainer;
