import  { getCourseIdFromUrl, getContentIdFromUrl }  from './util'

test('Check that we get the correct Course ID from a url', () => {
  let urls = [
    {url: "https://bb.its.iastate.edu/webapps/blackboard/execute/launcher?type=Course&id=_60065_1&url=", id: "_60065_1"},
    {url:  "https://bb.its.iastate.edu/webapps/blackboard/content/listContent.jsp?course_id=_60065_1&content_id=_3482700_1", id: "_60065_1"}
  ]
  for (const url_case of urls) {
    expect(getCourseIdFromUrl(url_case.url)).toBe(url_case.id)
  }
})

test('Check that we get the correct Content ID from a url', () => {
 let url = "https://bb.its.iastate.edu/webapps/blackboard/content/listContent.jsp?course_id=_60065_1&content_id=_3482700_1"
  expect(getContentIdFromUrl(url)).toBe("_3482700_1")
})
