import * as types from "./../constants/ActionTypes";


export default function reducer(state = {
    doctors: {},
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case types.FETCH_DOCTORS: {
        return {
          ...state,
          fetching: true
        }
      }
      case types.FETCH_DOCTORS_REJECTED: {
        return {
          ...state,
          ...action.data.entities.doctor,
          fetching: false,
          error: action.payload
        }
      }
      case types.FETCH_DOCTORS_FULFILLED: {
        return {
          ...state,
          fetching: false,
          fetched: true,
          doctors: action.payload,
        }
      }
      default: return state;
    }

}
