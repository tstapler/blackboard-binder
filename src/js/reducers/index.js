import { classesReducer } from './classes'
import { combineReducers } from 'redux'
import { downloadsReducer } from './downloads.js'
import { filesReducers } from './files'
import { pagesReducer } from './pages'
import { parserReducer } from './parser'

const rootReducer = combineReducers({
  'classes': classesReducer,
  'pages': pagesReducer,
  'files': filesReducers,
  'parser': parserReducer,
  'downloads': downloadsReducer
})

export default rootReducer
