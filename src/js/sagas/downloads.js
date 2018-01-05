import { call, put, select, takeEvery } from 'redux-saga/effects'
import { markFileAsDownloadedAction, selectFileAction, unselectFileAction } from '../actions/downloads'
import { batchActions } from 'redux-batched-actions'

import _ from 'lodash'
import chrome from 'then-chrome'
import { getPageIdFromComponents } from '../util'

const getSelectedFiles = (state) => state.downloads.selectedFilesById

const getFileUrlFromId = (state, id) => state.files.filesById[id].url

const downloadFile = async (fileUrl, fileName) => chrome.downloads.download({url: fileUrl, filename: fileName, saveAs: false})

const getFilePathFromId = (state, fileId) => {
  let file = state.files.filesById[fileId]
  let courseName = state.classes.classesById[file.courseId].title
  let parentName = state.pages.pagesById[getPageIdFromComponents(file.courseId, file.parentContentId)].title
  // BB sometimes has course names with leading and trailing spaces, chrome doesn't like that
  return [_.trim(courseName), _.trim(parentName), _.trim(file.title)].join('/')
}

const getUndownloadedFiles = (state) => _.filter(_.keys(state.files.filesById), (fileId) => !_.has(state.downloads.downloadedFilesById, fileId))

const getAllFiles = (state) => _.keys(state.files.filesById)

export function * unselectAllFiles () {
  try {
    let files = yield select(getAllFiles)
    yield put.resolve(batchActions(files.map((fileId) => unselectFileAction(fileId))))
  } catch (e) {
    console.log(e)
  }
}

export function * watchUnselectAllFiles () {
  yield takeEvery('UNSELECT_ALL_FILES', unselectAllFiles)
}

export function * selectAllFiles () {
  try {
    let files = yield select(getAllFiles)
    let fileSelectionActions = files.map((fileId) => selectFileAction(fileId))
    console.log(fileSelectionActions)
    yield put(batchActions(fileSelectionActions))
  } catch (e) {
    console.log(e)
  }
}

export function * watchSelectAllFiles () {
  yield takeEvery('SELECT_ALL_FILES', selectAllFiles)
}

export function * selectUndownloadedFiles () {
  try {
    let undownloadedFiles = yield select(getUndownloadedFiles)
    yield put.resolve(batchActions(undownloadedFiles.map((fileId) => selectFileAction(fileId))))
  } catch (e) {
    console.log(e)
  }
}

export function * watchSelectUndownloadedFiles () {
  yield takeEvery('SELECT_UNDOWNLOADED', selectUndownloadedFiles)
}

export function * downloadSelectedFiles () {
  try {
    let selectedFilesById = yield select(getSelectedFiles)
    for (const fileId of _.keys(selectedFilesById)) {
      let fileUrl = yield select(getFileUrlFromId, fileId)
      let filePath = yield select(getFilePathFromId, fileId)
      console.log(filePath)
      yield call(downloadFile, fileUrl, filePath)
      yield put.resolve(unselectFileAction(fileId))
      yield put.resolve(markFileAsDownloadedAction(fileId))
    }
  } catch (e) {
    console.log(e)
  }
}

export function * watchDownloadSelectedFiles () {
  yield takeEvery('DOWNLOAD_SELECTED_FILES', downloadSelectedFiles)
}
