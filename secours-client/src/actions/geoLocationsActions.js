import * as types from "./../constants/ActionTypes";


export const setGeoLocation = (coords) => {
  return (dispatch) => {
    dispatch({
      type: types.SET_USER_GEO_LOCATION,
      coords
    });
  }
}
