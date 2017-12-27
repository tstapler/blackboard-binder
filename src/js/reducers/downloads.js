import { handleActions } from 'redux-actions'
import update from 'immutability-helper'

const defaultState = {
  downloadedFilesById: {},
  selectedFilesById: {}
}

const reducer = handleActions({
  SELECT_FILE: (state, action) => update(state, {selectedFilesById: {[action.payload]: {$set: {}}}}),
  UNSELECT_FILE: (state, action) => update(state, {selectedFilesById: {$unset: [action.payload]}}),
  MARK_AS_DOWNLOADED: (state, action) => update(state, {downloadedFilesById: {[action.payload]: {$set: {}}}})
}, defaultState)

export { reducer as downloadsReducer }
