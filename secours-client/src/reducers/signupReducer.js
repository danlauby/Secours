import * as types from "./../constants/ActionTypes";


const INITIAL_STATE = {error:null, loading: false};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {
    case types.VALIDATE_USER:
    return { ...state, error:null, loading: true};
    case types.VALIDATE_USER_FULFILLED:
    return { ...state, error:null, loading: false};
    case types.VALIDATE_USER_REJECTED:
    error = action.payload.data ? action.payload.data : {message: action.payload.message}
    return { ...state, error:error, loading: false};
    case types.RESET_VALIDATE_USER:
    return { ...state, error:null, loading: false};
    default:
    return state;
  }
}
