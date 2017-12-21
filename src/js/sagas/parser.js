import _ from 'lodash'
import { put, call, take, takeLatest, select } from 'redux-saga/effects'

import { parsePageAction } from '../actions/pages'
import { processPage, processCourses } from '../parserControl'

const getClasses = (state) => _.values(state.classes.classesById)
const getUnparsedPages = (state) => _.filter(_.values(state.pages.pagesById), (page) => {
  return !page.visited
})

export function * parseAllClasses (action) {
  try {
    let currentTab = action.payload
    yield call(processCourses, currentTab.id)
    console.log("Getting classes")
    let classes = yield select(getClasses)
    console.log("Got classes", classes)
    for (const currClass of classes) {
      console.log(currClass)
      yield call(processPage, currentTab.id, currClass.url)
    }
    let unparsedPages = yield select(getUnparsedPages)
    while (_.some(unparsedPages)) {
      console.log(unparsedPages)
      let nextPage = _.first(unparsedPages)
      yield call(processPage, currentTab.id, nextPage.url)
      unparsedPages = yield select(getUnparsedPages)
    }
  } catch (e) {
    console.log(e)
  }
}

export function * watchParseAllClasses () {
  yield takeLatest('PARSE_ALL_CLASSES', parseAllClasses)
}

