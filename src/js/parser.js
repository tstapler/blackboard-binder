import { addClass } from './reducers/classes'
import { addPage } from './actions/pages'
import { addFile } from './actions/files'
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
    $.map($('a[href*="bbcswebdav"], embed[src*="bbcswebdav"]'), (item) => {
      if(item.nodeName == "EMBED"){
        return {title: $("#pageTitleText")[0].textContent, url: item.src,
                parentUrl: window.location.href }
      }
      return { title: item.text, url: item.href, parentUrl: window.location.href }
    }).forEach((payload) => {
      this.store.dispatch(addFile(payload))
    })
  }
}
