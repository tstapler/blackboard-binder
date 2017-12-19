import update from 'immutability-helper';
import { ADD_CLASS, DELETE_CLASS } from '../actions/classes'

const initialState = {
  classesById: {}
} 

export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_CLASS:
      break;
    case DELETE_CLASS:
      break;

    default:
      return state
  }
}
