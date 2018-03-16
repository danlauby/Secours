import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth from './reducers/auth';
import doctors from './reducers/doctorsReducer';
import flashMessages from './reducers/flashMessages';
import signup from './reducers/signupReducer';
import geoLocation from './reducers/geoLocationsReducer';


export default combineReducers({
  auth,
  doctors,
  form: formReducer,
  flashMessages,
  geoLocation,
  signup
});
