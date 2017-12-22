import { classesReducer } from './classes'
import { combineReducers } from 'redux'
import { filesReducers } from './files'
import { pagesReducer } from './pages'

const rootReducer = combineReducers({
  'classes': classesReducer,
  'pages': pagesReducer,
  'files': filesReducers
})

export default rootReducer
