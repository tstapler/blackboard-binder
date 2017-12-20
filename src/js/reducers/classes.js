import { handleActions, createAction } from 'redux-actions'
import update from 'immutability-helper'

const defaultState = {
  classesById: { 1: {"name": "Math 167", "count": 10}}
}

export const addClass = createAction('CLASS_ADD')
export const removeClass = createAction('CLASS_REMOVE')

const reducer = handleActions({
  CLASS_ADD: (state, action) => {
    console.log(state, action)
    return update(state, {
      classesById: {
        [action.payload.url]: {$set: action.payload.title}
      }
    })
  },
  CLASS_REMOVE: (state, action) => update(state, {
    classesById: {
      $unset: action.payload.url
    }
  })
}, defaultState)

export { reducer as classesReducer }
