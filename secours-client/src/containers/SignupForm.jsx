import SignupForm from '../components/signup/SignupForm';
import { resetValidateUser } from '../actions/signupActions';
import { connect } from 'react-redux';



const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetValidateUser());
    }
  }
}


function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    validateFields: state.validateFields,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
