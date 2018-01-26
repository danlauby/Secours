import axios from "axios";
import * as types from "./../constants/ActionTypes";


export const fetchDoctors = (issue) => {
  let url = '/api/get-doctors';

  console.log(issue.issue);
  return (dispatch) => {
    dispatch({
      type: types.FETCH_DOCTORS
    });

    axios.get(url, {params: {issue: issue.issue }})
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
