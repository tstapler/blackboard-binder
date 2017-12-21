import { getContentIdFromUrl, getCourseIdFromUrl } from '../util'

import { handleActions } from 'redux-actions'
import update from 'immutability-helper'

const defaultState = {
  pagesById: {}
}

const reducer = handleActions({
  PAGE_ADD: (state, action) => {
    let pageId = getContentIdFromUrl(action.payload.url)
    let courseId = getCourseIdFromUrl(action.payload.url)
    return update(state, {pagesById: {
      [pageId]: {
        $set: {
          ...action.payload,
          pageId,
          courseId,
          visited: false
        }
      }
    }
    })
  },
  PAGE_VISIT: (state, action) => {
    let contentId = getContentIdFromUrl(action.payload.url)
    return update(state, {
      pagesById: {
        [contentId]: {
          visited: {
            $set: true
          }
        }
      }
    })
  }
}, defaultState)

export { reducer as pagesReducer }
