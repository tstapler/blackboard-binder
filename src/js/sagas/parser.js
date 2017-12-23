import { call, cancel, fork, put, select, take } from 'redux-saga/effects'
import { processCourses, processPage } from '../parserControl'

import _ from 'lodash'
import { finishParseAction } from '../actions/parser'
import { visitPage } from '../actions/pages'

const getClasses = (state) => _.values(state.classes.classesById)
const getUnparsedPages = (state) => _.filter(_.values(state.pages.pagesById), (page) => {
  return !page.visited
})

export function * parseAllClasses (action) {
  try {
    let currentTab = action.payload
    yield call(processCourses, currentTab.id)
    console.log('Getting classes')
    let classes = yield select(getClasses)
    console.log('Got classes', classes)
    for (const currClass of classes) {
      console.log(currClass)
      yield call(processPage, currentTab.id, currClass.url)
    }
    console.log('Getting unparsed pages')
    let unparsedPages = yield select(getUnparsedPages)
    while (_.some(unparsedPages)) {
      console.log('Unparsed pages:', unparsedPages)
      let currentPage = _.first(unparsedPages)
      yield call(processPage, currentTab.id, currentPage.url)
      yield put.resolve(visitPage(currentPage))
      unparsedPages = yield select(getUnparsedPages)
    }
    console.log('Finished Parse')
    yield put(finishParseAction())
  } catch (e) {
    console.log(e)
  }
}

export function * watchParseAllClasses () {
  let action = null
  while ((action = yield take('PARSE_ALL_CLASSES'))) {
    let parserTask = yield fork(parseAllClasses, action)
    yield take('PARSE_FINISH')
    yield cancel(parserTask)
  }
}
