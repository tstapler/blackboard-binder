import React from "react";
import _ from "lodash";
import {  Button, Icon, Segment } from 'semantic-ui-react';

const coursePage = "https://bb.its.iastate.edu/webapps/portal/execute/tabs/tabAction?tab_tab_group_id=_2_1"

function sendToCurrentTab(response) {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
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
      (tabs) => {
        chrome.tabs.update(tabs[0].id, {url: coursePage}, () => {
          setTimeout(
          chrome.tabs.sendMessage(
            tabs[0].id,
            {getCourseList: true},
            (response) => {}), 2000)
        });
      });
  }

  parseFiles() {
    sendToCurrentTab({parseFiles: true});
  }

  render () {
    return (
      <div>
      <Segment color='black'>
        <Button.Group size='mini' widths='2'>
          <Button onClick={this.parseClassList}>Parse Class List</Button>
          <Button onClick={this.parseFiles}>Parse Files</Button>
        </Button.Group>
      </Segment>
      </div>
    )
  }
};
