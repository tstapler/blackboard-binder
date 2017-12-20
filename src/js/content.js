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
      if (request.getCourseList) {
        console.log(store.state)
        console.log('Updating course list')
        parser.getCourseList()
        console.log(store.state)
      } else if (request.parseFiles) {
        console.log(parser.parseFiles())
      // Universal ContentScript communication handler
      } else if (request.contentScriptCall) {
      }
    }, 2000)
  }
)
