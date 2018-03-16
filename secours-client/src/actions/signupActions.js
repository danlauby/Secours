import axios from 'axios';
// import * as types from "./../constants/ActionTypes";


export function userSignupRequest(userData) {
  return dispatch => {
    return axios.post('/api/users', userData);
  }
}

// export const userSignupRequest = (userData) => {
//   const url = '/api/users';
//
//   return (dispatch) => {
//     dispatch({
//       type: types.USER_SIGNUP
//     });
//
//     axios.post(url, userData)
//     .then((response) => {
//       dispatch({
//         type: types.USER_SIGNUP_FULFILLED,
//         payload: response.data.data
//       });
//     })
//     .catch((err) => {
//       dispatch({
//         type: types.USER_SIGNUP_REJECTED,
//         payload: err})
//       });
//     }
//   }

export function isUserExists(identifier) {
  return dispatch => {
    return axios.get(`/api/users/${identifier}`);
  }
}

// export function validateUser(values) {
//   const request = axios.get(`/api/users/${values}`);
//
//   return {
//     type: types.VALIDATE_USER,
//     payload: request
//   };
// }
//
// export function validateUserRejected(error) {
//   return {
//     type: types.VALIDATE_USER_REJECTED,
//     payload: error
//   };
// }
//
// export function validateUserFulfilled() {
//   return {
//     type: types.VALIDATE_USER_FULFILLED
//   };
// }
//
// export function resetValidateUser() {
//   return {
//     type: types.RESET_VALIDATE_USER
//   }
// };
