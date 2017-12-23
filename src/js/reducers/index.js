import { classesReducer } from './classes'
import { combineReducers } from 'redux'
import { filesReducers } from './files'
import { pagesReducer } from './pages'
import { parserReducer } from './parser'

const rootReducer = combineReducers({
  'classes': classesReducer,
  'pages': pagesReducer,
  'files': filesReducers,
  'parser': parserReducer
})

export default rootReducer
