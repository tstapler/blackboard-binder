import { call, put, select, takeEvery } from 'redux-saga/effects'

import chrome from 'then-chrome'
import { markFileAsDownloadedAction } from '../actions/downloads'
import _ from 'lodash'

const getSelectedFiles = (state) => state.downloads.selectedFilesById

const getFileUrlFromId = (state, id) => state.files.filesById[id].url

const downloadFile = async (fileUrl) => chrome.downloads.download({url: fileUrl})

export function * downloadSelectedFiles () {
  console.log('Downloading')
  try {
    let selectedFilesById = yield select(getSelectedFiles)
    for (const fileId of _.keys(selectedFilesById)) {
      let fileUrl = yield select(getFileUrlFromId, fileId)
      console.log(fileUrl)
      yield call(downloadFile, fileUrl)
      yield put.resolve(markFileAsDownloadedAction(fileId))
    }
  } catch (e) {
    console.log(e)
  }
}

export function * watchDownloadSelectedFiles () {
  yield takeEvery('DOWNLOAD_SELECTED_FILES', downloadSelectedFiles)
}
