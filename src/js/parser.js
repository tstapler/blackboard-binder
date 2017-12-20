import jquery from 'jquery'

window.$ = jquery

export default class Parser {
  getCourseList () {
    return $.map($('ul.courseListing li a'), function (item) {
      return {'title': item.text, 'url': item.href}
    })
  }

  parseFiles () {
    return $.map($('a[href*="bbcswebdav"]'), function (item) {
      return { 'title': item.text, 'url': item.href }
    })
  }
}
