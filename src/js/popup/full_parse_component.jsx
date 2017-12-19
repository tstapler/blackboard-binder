import React from "react";

const coursePage = "https://bb.its.iastate.edu/webapps/portal/execute/tabs/tabAction?tab_tab_group_id=_2_1"

export default class extends React.Component {
  parseBlackboard () {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.update(tabs[0].id, {url: coursePage});
      setTimeout(function() {
        chrome.tabs.sendMessage(tabs[0].id, {getCourseList: true}, function(response) {});
      }, 3000)
    });
  }

  parseFiles() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {parseFiles: true});
    });
  }

  render () {
    return (
      <div>
      <button onClick={this.parseBlackboard}>Parse Blackboard</button>
      <button onClick={this.parseFiles}>Parse Files</button>
      </div>
    )
  }
};
