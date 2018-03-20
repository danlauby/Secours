import * as types from "./../constants/ActionTypes";


const initialState = {
  coords: {},
  fetched: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case types.SET_USER_GEO_LOCATION:
    console.log('Reducer Go Location', action);
    return {
      coords: action.coords,
      fetched: true
    }
    default:
    return state
  }
}
