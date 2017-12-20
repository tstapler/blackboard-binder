import { combineReducers } from 'redux'
import { classesReducer } from './classes'

const rootReducer = combineReducers({
  'classes': classesReducer
})

export default rootReducer
