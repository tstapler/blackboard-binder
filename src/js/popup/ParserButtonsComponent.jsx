import { Button, Segment } from 'semantic-ui-react'

import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

const coursePage = 'https://bb.its.iastate.edu/webapps/portal/execute/tabs/tabAction?tab_tab_group_id=_2_1'

function sendToCurrentTab (response) {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    if (_.isFunction(response)) {
      response(tabs)
    } else {
      chrome.tabs.sendMessage(tabs[0].id, response)
    }
  })
}

class ParserButtonsComponent extends React.Component {
  parseClassList () {
    sendToCurrentTab(
      (tabs) => {
        chrome.tabs.update(tabs[0].id, {url: coursePage})
        setTimeout(() => {
          console.log('Timeout Triggered')
          chrome.tabs.sendMessage(
              tabs[0].id,
              {getCourseList: true},
              (response) => {})
        }, 3000)
      })
  }

  parseFiles () {
    sendToCurrentTab({parseFiles: true})
  }

  parsePage () {
    sendToCurrentTab({parseCoursePage: true})
  }

  render () {
    return (
      <div>
        <Segment color='black'>
          <Button.Group size='mini' widths='1'>
            <Button onClick={this.parseClassList}>Parse Class List</Button>
            <Button onClick={this.parseFiles}>Parse Files</Button>
            <Button onClick={this.parsePage}>Parse Page</Button>
          </Button.Group>
        </Segment>
      </div>
    )
  }
};

const mapStateToProps = state => state

export default connect(mapStateToProps)(ParserButtonsComponent)
