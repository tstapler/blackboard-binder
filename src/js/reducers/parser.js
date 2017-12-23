import { handleActions } from 'redux-actions'
import update from 'immutability-helper'

const defaultState = {
  parsing: false
}

const reducer = handleActions({
  PARSE_FINISH: (state, action) => {
    return update(state, { parsing: {$set: false} }
    )
  },
  PARSE_ALL_CLASSES: (state, action) => {
    return update(state, { parsing: {$set: true} })
  }
}, defaultState)

export { reducer as parserReducer }
