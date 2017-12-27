import { call, put, select, takeEvery } from 'redux-saga/effects'

import chrome from 'then-chrome'
import { markFileAsDownloadedAction } from '../actions/downloads'
import { getPageIdFromComponents } from '../util'
import _ from 'lodash'

const getSelectedFiles = (state) => state.downloads.selectedFilesById

const getFileUrlFromId = (state, id) => state.files.filesById[id].url

const downloadFile = async (fileUrl, fileName) => chrome.downloads.download({url: fileUrl, filename: fileName})

const getFilePathFromId = (state, fileId) => {
  let file = state.files.filesById[fileId]
  let courseName = state.classes.classesById[file.courseId].title
  let parentName = state.pages.pagesById[getPageIdFromComponents(file.courseId, file.parentContentId)].title
  return [courseName, parentName, file.title].join('/')
}

export function * downloadSelectedFiles () {
  console.log('Downloading')
  try {
    let selectedFilesById = yield select(getSelectedFiles)
    for (const fileId of _.keys(selectedFilesById)) {
      let fileUrl = yield select(getFileUrlFromId, fileId)
      let filePath = yield select(getFilePathFromId, fileId)
      yield call(downloadFile, fileUrl, filePath)
      yield put.resolve(markFileAsDownloadedAction(fileId))
    }
  } catch (e) {
    console.log(e)
  }
}

export function * watchDownloadSelectedFiles () {
  yield takeEvery('DOWNLOAD_SELECTED_FILES', downloadSelectedFiles)
}
