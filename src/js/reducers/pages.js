import { getContentIdFromUrl, getCourseIdFromUrl, getPageIdFromUrl } from '../util'

import { handleActions } from 'redux-actions'
import update from 'immutability-helper'

const defaultState = {
  pagesById: {}
}

const reducer = handleActions({
  PAGE_ADD: (state, action) => {
    let id = getPageIdFromUrl(action.payload.url)
    let contentId = getContentIdFromUrl(action.payload.url)
    let courseId = getCourseIdFromUrl(action.payload.url)
    if(!_.has(state.pagesById, id)) {
      return update(state, {pagesById: {
        [id]: {
          $set: {
            ...action.payload,
            id,
            contentId,
            courseId,
            visited: false
          }
        }
      }
    })
    } else {
      return state
    }
  },
  PAGE_VISIT: (state, action) => {
    let id = getPageIdFromUrl(action.payload.url)
    return update(state, {
      pagesById: {
        [id]: {
          visited: {
            $set: true
          }
        }
      }
    })
  }
}, defaultState)

export { reducer as pagesReducer }
