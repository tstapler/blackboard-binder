import { getContentIdFromUrl, getCourseIdFromUrl, getFileIdFromUrl } from '../util'

import { handleActions } from 'redux-actions'
import update from 'immutability-helper'

const defaultState = {
  filesById: {
  }
}

const reducer = handleActions({
  FILE_ADD: (state, action) => {
    let newId = getFileIdFromUrl(action.payload.url)
    let courseId = getCourseIdFromUrl(action.payload.parentUrl)
    let parentContentId = getContentIdFromUrl(action.payload.parentUrl)

    console.log(newId)
    return update(state, {
      filesById: {
        [newId]: {
          $set: {
            ...action.payload,
            id: newId,
            parentContentId: parentContentId,
            courseId: courseId
          }
        }
      }
    }
    )
  }
}, defaultState)

export { reducer as filesReducers }
