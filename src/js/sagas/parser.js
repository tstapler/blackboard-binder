/* eslint-env browser */
import { call, cancel, fork, put, select, take } from 'redux-saga/effects'
import { processCourses, processPage } from '../parserControl'

import { batchActions } from 'redux-batched-actions'
import _ from 'lodash'
import chrome from 'then-chrome'
import { finishParseAction } from '../actions/parser'
import { visitPage } from '../actions/pages'

const getClasses = (state) => _.values(state.classes.classesById)
const getUnparsedPages = (state) => _.filter(_.values(state.pages.pagesById), (page) => {
  return !page.visited
})

const createTab = async () => chrome.tabs.create({selected: false})
const deleteTabs = async (tabs) => chrome.tabs.remove(tabs)
const setCurrentTab = async (tabId) => chrome.tabs.update(tabId, {highlighted: true})

const numberOfTabs = 5

const batchProcessClasses = async (pages, tabIds) => {
  console.log('Pages left to parse:', pages)
  let targetPages = _.take(pages, numberOfTabs)
  await Promise.all(_.map(_.zip(_.take(tabIds, targetPages.length), targetPages), ([tabId, page]) =>
    processPage(tabId, page.url)))
  return targetPages
}

export function * parseAllClasses (action) {
  var startTime = performance.now()
  var tabIds = []
  for (var i = 0; i < numberOfTabs; i++) {
    tabIds[i] = yield call(createTab)
  }
  tabIds = _.map(tabIds, (tab) => tab.id)
  try {
    console.log(tabIds)
    let currentTabId = _.first(tabIds)
    yield call(setCurrentTab, currentTabId)
    console.log('Current Tab', currentTabId)
    yield call(processCourses, currentTabId)
    console.log('Getting classes')
    let classes = yield select(getClasses)
    console.log('Got classes', classes)
    for (const currClasses of _.chunk(classes, numberOfTabs)) {
      console.log('Curr Classes', currClasses)
      yield call(batchProcessClasses, currClasses, tabIds)
    }
    console.log('Getting unparsed pages')
    let unparsedPages = yield select(getUnparsedPages)
    while (_.some(unparsedPages)) {
      let visitedPages = yield call(batchProcessClasses, unparsedPages, tabIds)
      try {
        yield put(batchActions(_.map(visitedPages, (page) => visitPage(page))))
      } catch (e) {
        console.log("Failed parsing pages:", e)
      }
      unparsedPages = yield select(getUnparsedPages)
    }
    console.log('Finished Parse')
    yield put(finishParseAction())
  } catch (e) {
    console.log(e)
  } finally {
    yield call(deleteTabs, tabIds)
    console.log('Parsing took:', performance.now() - startTime)
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
