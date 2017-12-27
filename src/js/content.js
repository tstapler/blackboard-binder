import Parser from './parser'
import {Store} from 'react-chrome-redux'
import { addClass } from './reducers/classes'

window.addClass = addClass

const store = new Store({
  portName: 'BBBINDER' // communication port name
})

window.store = store

const parser = new Parser(store)

window.parser = parser

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    console.log('chrome.runtime.onMessage', request)
    setTimeout(() => {
      if (request.parseForCoursePage) {
        parser.parseCourseList()
      } else if (request.processPage) {
        parser.parsePages()
        parser.parseFiles()
      }
      sendResponse('Finished')
    }, 1000)
    return true
  }
)
