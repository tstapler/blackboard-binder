import jquery from 'jquery'
import { addClass } from './reducers/classes'

window.$ = jquery
window.addClass = addClass

export default class Parser {
  constructor (store) {
    this.store = store
  }

  getCourseList () {
    $.map($('ul.courseListing li a'), function (item) {
      return {'title': item.text, 'url': item.href}
    }).forEach((payload) => {
      this.store.dispatch(addClass(payload))
    })
  }

  parseFiles () {
    return $.map($('a[href*="bbcswebdav"]'), function (item) {
      return { 'title': item.text, 'url': item.href }
    })
  }
}
