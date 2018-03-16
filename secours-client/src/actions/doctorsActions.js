import axios from "axios";
import * as types from "./../constants/ActionTypes";


export const fetchDoctors = (condition, coords) => {
  const url = '/api/get-doctors';
  return (dispatch) => {
    dispatch({
      type: types.FETCH_DOCTORS
    });

    axios.get(url, {params: {condition: condition.condition, lat: coords.lat, lng: coords.lng }})
    .then((response) => {
      dispatch({
        type: types.FETCH_DOCTORS_FULFILLED,
        payload: response.data.data
      });
    })
    .catch((err) => {
      dispatch({
        type: types.FETCH_DOCTORS_REJECTED,
        payload: err})
      });
    }
  }
