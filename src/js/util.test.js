/* eslint-env jest */
import { getContentIdFromUrl, getCourseIdFromUrl } from './util'

function checkUrls (testFunction, testUrls) {
  for (const testUrl of testUrls) {
    expect(testFunction(testUrl.url)).toBe(testUrl.id)
  }
}

test('Check that we get the correct Course ID from a url', () => {
  let testUrls = [
    {url: 'https://bb.its.iastate.edu/webapps/blackboard/execute/launcher?type=Course&id=_60065_1&url=', id: '_60065_1'},
    {url: 'https://bb.its.iastate.edu/webapps/blackboard/content/listContent.jsp?course_id=_60065_1&content_id=_3482700_1', id: '_60065_1'}
  ]
  checkUrls(getCourseIdFromUrl, testUrls)
})

test('Check that we get the correct Content ID from a url', () => {
  let testUrls = [
    {
      url: 'https://bb.its.iastate.edu/webapps/blackboard/content/listContent.jsp?course_id=_60065_1&content_id=_3482700_1', id: '_3482700_1'
    }
  ]
  checkUrls(getContentIdFromUrl, testUrls)
})
