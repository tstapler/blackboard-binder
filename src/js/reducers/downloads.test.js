/* eslint-env jest */
import { selectFile, unselectFile } from '../actions/downloads'

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
      downloadsReducer(undefined, selectFile('testid'))
    ).toEqual({
      downloadedFilesById: {},
      selectedFiles: ['testid']
    })

    expect(
      downloadsReducer(
        {downloadedFilesById: {},
          selectedFiles: ['testid']}
        , unselectFile('testid')
      )
    ).toEqual(
      {
        downloadedFilesById: {},
        selectedFiles: []
      }
    )
  })
})
