import { handleActions } from 'redux-actions'
import update from 'immutability-helper'

const defaultState = {
  downloadedFilesById: {},
  selectedFiles: []
}

const reducer = handleActions({
  SELECT_FILE: (state, action) => update(state, {selectedFiles: {$push: [action.payload]}}),
  UNSELECT_FILE: (state, action) => update(state, {selectedFiles: {$splice: [[action.payload]]}})
}, defaultState)

export { reducer as downloadsReducer }
