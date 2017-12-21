import { createAction, handleActions } from 'redux-actions'

import { getCourseIdFromUrl } from '../util'
import update from 'immutability-helper'

const defaultState = {
  classesById: {
  }
}

export const addClass = createAction('CLASS_ADD')

const reducer = handleActions({
  CLASS_ADD: (state, action) => {
    let id = getCourseIdFromUrl(action.payload.url)
    console.log(id)
    return update(state, {
      classesById: {
        [id]: {
          $set: {
            ...action.payload,
            id,
            count: 0
          }
        }
      }
    }
    )
  }
}, defaultState)

export { reducer as classesReducer }
