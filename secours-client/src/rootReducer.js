import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import doctors from './reducers/doctorsReducer';
import auth from './reducers/auth';


export default combineReducers({
  flashMessages,
  auth,
  doctors
});
