import { connect } from 'react-redux';
import Doctors from './../components/doctors/Doctors';
import { fetchDoctors } from "./../actions/doctorsActions";


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
)(Doctors);


export default DoctorsContainer;
