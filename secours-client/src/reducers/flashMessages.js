import * as types from "./../constants/ActionTypes";
import { v4 } from 'uuid';


export default function(state = [], action = {}) {
  switch(action.type) {
    case types.ADD_FLASH_MESSAGE:
    return [
      ...state,
      {
        id: v4(),
        type: action.message.type,
        text: action.message.text
      }
    ];
    case types.DELETE_FLASH_MESSAGE:
    return state.filter(message => message.id !== action.id);﻿
    default: return state;
  }

}
