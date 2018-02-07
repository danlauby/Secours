import axios from "axios";
import * as types from "./../constants/ActionTypes";


export const fetchDoctors = (condition) => {
  let url = '/api/get-doctors';

  return (dispatch) => {
    dispatch({
      type: types.FETCH_DOCTORS
    });

    axios.get(url, {params: {condition: condition.condition }})
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
