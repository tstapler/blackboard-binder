import chrome from 'then-chrome'
import delay from 'delay'

export const COURSE_PAGE = 'https://bb.its.iastate.edu/webapps/portal/execute/tabs/tabAction?tab_tab_group_id=_2_1'

export async function getCurrentTab () {
  let tabs = await chrome.tabs.query({active: true, currentWindow: true})
  console.log('Getting tabs')
  return tabs[0]
}

export async function changeUrl (tabId, url) {
  await chrome.tabs.update(tabId, {url: url})
}

export async function sendMessage (tabId, messageType) {
  console.log('Sending Message:', messageType)
  await delay(1000)
  let response = await chrome.tabs.sendMessage(tabId, {[messageType]: true})
  console.log(response)
}

export async function parseForPages (tabId) {
  await sendMessage(tabId, 'parseForPages')
}
export async function parseForFiles (tabId) {
  await sendMessage(tabId, 'parseForFiles')
}

export async function processPage (tabId, url) {
  await changeUrl(tabId, url)
  await parseForPages(tabId)
  await parseForFiles(tabId)
}

export async function processCourses (tabId) {
  await changeUrl(tabId, COURSE_PAGE)
  await sendMessage(tabId, 'parseForCoursePage')
}
