import { classesReducer } from './classes'
import { combineReducers } from 'redux'
import { pagesReducer } from './pages'

const rootReducer = combineReducers({
  'classes': classesReducer,
  'pages': pagesReducer
})

export default rootReducer
