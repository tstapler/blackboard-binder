/* eslint-env jest */
import { markFileAsDownloadedAction, selectFileAction, unselectFileAction } from '../actions/downloads'

import {downloadsReducer} from './downloads'

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(downloadsReducer(undefined, {})).toEqual({
      downloadedFilesById: {},
      selectedFiles: []
    })
  })

  it('should handle DOWNLOADS_SELECT_FILE', () => {
    expect(
      downloadsReducer(undefined, selectFileAction('testid'))
    ).toEqual({
      downloadedFilesById: {},
      selectedFiles: ['testid']
    })
  })

  it('should handle UNSELECT_FILE', () => {
    expect(
      downloadsReducer(
        {downloadedFilesById: {},
          selectedFiles: ['testid']}
        , unselectFileAction('testid')
      )
    ).toEqual(
      {
        downloadedFilesById: {},
        selectedFiles: []
      }
    )
  })

  it('should handle MARK_AS_DOWNLOADED', () => {
    expect(
      downloadsReducer(undefined, markFileAsDownloadedAction('testid'))
    ).toEqual({
      downloadedFilesById: { testid: {} },
      selectedFiles: []
    })
  })
})
