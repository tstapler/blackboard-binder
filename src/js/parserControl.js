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
  let response = await chrome.tabs.sendMessage(tabId, {[messageType]: true})
  console.log(response)
}

export async function processPage (tabId, url) {
  let startTime = await performance.now()
  await changeUrl(tabId, url)
  await delay(1500)
  await sendMessage(tabId, 'processPage')
  let endTime = await performance.now()
  console.log('Processing the page took - ', endTime - startTime, 'ms')
}

export async function processCourses (tabId) {
  await changeUrl(tabId, COURSE_PAGE)
  await delay(4000)
  await sendMessage(tabId, 'parseForCoursePage')
}
