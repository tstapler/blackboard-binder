import React from "react";
import _ from "lodash";

const coursePage = "https://bb.its.iastate.edu/webapps/portal/execute/tabs/tabAction?tab_tab_group_id=_2_1"

function sendToCurrentTab(response) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (_.isFunction(response)) {
        response(tabs)
      } else {

        chrome.tabs.sendMessage(tabs[0].id, response);
      }
    });
}

export default class extends React.Component {
  parseClassList () {
    sendToCurrentTab(
      function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: coursePage});
        setTimeout(function() {
          chrome.tabs.sendMessage(tabs[0].id, {getCourseList: true}, function(response) {});
        }, 3000)
      });
  }

  parseFiles() {
    sendToCurrentTab({parseFiles: true});
  }

  render () {
    return (
      <div>
      <button onClick={this.parseClassList}>Parse Class List</button>
      <button onClick={this.parseFiles}>Parse Files</button>
      </div>
    )
  }
};
