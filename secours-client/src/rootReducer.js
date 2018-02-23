import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import flashMessages from './reducers/flashMessages';
import doctors from './reducers/doctorsReducer';
import auth from './reducers/auth';


export default combineReducers({
  auth,
  doctors,
  form: formReducer,
  flashMessages,
});
