import _ from 'lodash'
import parseUrl from 'parse-url'
import queryString from 'query-string'

export const getQueryObject = (url) => queryString.parse(parseUrl(url).search)

export const getCourseIdFromUrl = (url) => {
  let options = getQueryObject(url)
  if (_.includes(options, 'Course')) {
    return options.id
  } else {
    return options.course_id
  }
}

export const getContentIdFromUrl = (url) => getQueryObject(url).content_id
