import { addClass } from './reducers/classes'
import { addPage } from './actions/pages'
import jquery from 'jquery'

window.$ = jquery
window.addClass = addClass

export default class Parser {
  constructor (store) {
    this.store = store
  }

  getCourseList () {
    $.map($('ul.courseListing li a'), (item) => {
      return {'title': item.text, 'url': item.href}
    }).forEach((payload) => {
      this.store.dispatch(addClass(payload))
    })
  }

  parseCoursePage () {
    $.map($('ul#courseMenuPalette_contents > li > a[href*="content_id"]'), (a) => {
      return { url: a.href, title: $(a).find('span').text(), parentUrl: window.location.href }
    }).forEach((payload) => {
      this.store.dispatch(addPage(payload))
    })
  }

  parseFiles () {
    console.log($.map($('a[href*="bbcswebdav"]'), (item) => {
      return { 'title': item.text, 'url': item.href }
    }))
  }
}
