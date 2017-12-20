import { classesReducer } from './classes'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  'classes': classesReducer
})

export default rootReducer
