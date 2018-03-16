import * as types from "./../constants/ActionTypes";


export default function(state={}, action) {
  switch(action.type) {
    case types.SET_USER_GEO_LOCATION:
    console.log('Reducer Go Location', action);
    return {
      coords: action.coords
    };
    default:
    return state
  }
}
