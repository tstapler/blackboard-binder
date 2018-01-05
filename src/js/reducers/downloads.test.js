/* eslint-env jest */
import { markFileAsDownloadedAction, selectAllFilesAction, selectFileAction, selectUndownloadedFilesAction, unselectAllFilesAction, unselectFileAction } from '../actions/downloads'

import {downloadsReducer} from './downloads'

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(downloadsReducer(undefined, {})).toEqual({
      downloadedFilesById: {},
      selectedFilesById: {}
    })
  })

  it('should handle DOWNLOADS_SELECT_FILE', () => {
    expect(
      downloadsReducer(undefined, selectFileAction('testid'))
    ).toEqual({
      downloadedFilesById: {},
      selectedFilesById: {testid: {}}
    })
  })

  it('should handle UNSELECT_FILE', () => {
    expect(
      downloadsReducer(
        {downloadedFilesById: {},
          selectedFilesById: {'testid': {}}}
        , unselectFileAction('testid')
      )
    ).toEqual(
      {
        downloadedFilesById: {},
        selectedFilesById: {}
      }
    )
  })

  it('should handle MARK_AS_DOWNLOADED', () => {
    expect(
      downloadsReducer(undefined, markFileAsDownloadedAction('testid'))
    ).toEqual({
      downloadedFilesById: { testid: {} },
      selectedFilesById: {}
    })
  })

  it('should handle UNSELECT_ALL_FILES', () => {
    expect(
      downloadsReducer(
        {downloadedFilesById: {},
          selectedFilesById: {'testid': {}, 'testid2': {}}}
        , unselectAllFilesAction()
      )).toEqual({
        downloadedFilesById: {},
        selectedFilesById: {}
      })
  })
})
