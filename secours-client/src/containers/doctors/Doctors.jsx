import { connect } from 'react-redux';
import { fetchDoctors } from "../../actions/doctorsActions";

import Doctors from '../../components/doctors/Doctors';


const mapStateToProps = (state) => {
  return {
    doctors: state.doctors.doctors,
    fetching: state.doctors.fetching,
    fetched: state.doctors.fetched,
    userLocation: state.geoLocation.coords,
    coordsFetched: state.geoLocation.fetched
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
