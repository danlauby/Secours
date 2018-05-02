import { connect } from 'react-redux';

import UserProfile from '../../components/userProfile/UserProfile';


const mapStateToProps = (state) => {
  return {
    userAuth: state.auth.user
  };
};

const UserProfileContainer = connect(
  mapStateToProps
)(UserProfile);

export default connect(mapStateToProps, null)(UserProfileContainer);
