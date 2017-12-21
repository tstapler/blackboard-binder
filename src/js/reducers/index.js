import { classesReducer } from './classes'
import { combineReducers } from 'redux'
import { pagesReducer } from './pages'
import { filesReducers } from './files'

const rootReducer = combineReducers({
  'classes': classesReducer,
  'pages': pagesReducer,
  'files': filesReducers
})

export default rootReducer
