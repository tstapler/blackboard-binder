import { createAction, handleActions } from 'redux-actions'

import queryString from 'query-string'
import update from 'immutability-helper'

const getCourseIdFromUrl = (url) => {
  return queryString.parse(url).id.replace(/_1/g, '').replace(/_/g, '')
}

const defaultState = {
  classesById: {
  }
}

export const addClass = createAction('CLASS_ADD')
export const removeClass = createAction('CLASS_REMOVE')

const reducer = handleActions({
  CLASS_ADD: (state, action) => {
    let newId = getCourseIdFromUrl(action.payload.url)
    console.log(newId)
    return update(state, {
      classesById: {
        [newId]: {
          $set: {
            ...action.payload,
            id: newId,
            count: 0
          }
        }
      }
    }
    )
  },
  CLASS_REMOVE: (state, action) => update(state, {
    classesById: {
      $unset: action.payload.url
    }
  })
}, defaultState)

export { reducer as classesReducer }
