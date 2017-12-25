import { handleActions } from 'redux-actions'
import update from 'immutability-helper'

const defaultState = {
  downloadedFilesById: {},
  selectedFiles: []
}

const reducer = handleActions({
  SELECT_FILE: (state, action) => update(state, {selectedFiles: {$push: [action.payload]}}),
  UNSELECT_FILE: (state, action) => update(state, {selectedFiles: {$splice: [[action.payload]]}}),
  MARK_AS_DOWNLOADED: (state, action) => update(state, {downloadedFilesById: {[action.payload]: {$set: { }}}})
}, defaultState)

export { reducer as downloadsReducer }
