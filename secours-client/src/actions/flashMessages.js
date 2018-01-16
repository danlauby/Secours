import * as types from "./../constants/ActionTypes";


export function addFlashMessage(message) {
  return {
    type: types.ADD_FLASH_MESSAGE,
    message
  }
}

export function deleteFlashMessage(id) {
  return {
    type: types.DELETE_FLASH_MESSAGE,
    id
  }
}
