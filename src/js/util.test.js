/* eslint-env jest */
import { getContentIdFromUrl, getCourseIdFromUrl, getFileIdFromUrl } from './util'

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

test('Check that we get the correct File ID from a url', () => {
  let testUrls = [
    {url: 'https://bb.its.iastate.edu/bbcswebdav/pid-3834264-dt-content-rid-42404217_1/courses/F2017-CPR_E-308_-ALL/quiz1-solution.pdf', id: 'pid-3834264-dt-content-rid-42404217_1',},
    {url: 'https://bb.its.iastate.edu/bbcswebdav/pid-509091-dt-announcement-rid-44600741_1/xid-44600741_1', id: "pid-509091-dt-announcement-rid-44600741_1" }

  ]
  checkUrls(getFileIdFromUrl, testUrls)
})
