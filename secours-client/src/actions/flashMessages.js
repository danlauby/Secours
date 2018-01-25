import * as types from "./../constants/ActionTypes";


export const addFlashMessage = (message) => {
  return {
    type: types.ADD_FLASH_MESSAGE,
    message
  }
}

export const deleteFlashMessage = (id) => {
  return {
    type: types.DELETE_FLASH_MESSAGE,
    id
  }
}
