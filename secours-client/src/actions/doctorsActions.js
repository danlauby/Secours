import axios from "axios";
import * as types from "./../constants/ActionTypes";


export function fetchDoctors() {
  const url = '/api/get-doctors';

  return function(dispatch) {
    dispatch({
      type: types.FETCH_DOCTORS
    });

    axios.get(url)
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
