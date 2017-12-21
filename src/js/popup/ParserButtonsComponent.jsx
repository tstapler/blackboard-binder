import { Button, Segment } from 'semantic-ui-react'

import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import { processCourses, parseForFiles, parseForPages, getCurrentTab } from '../parserControl'
import { parseAllClassesAction } from '../actions/parser'

class ParserButtonsComponent extends React.Component {
  render () {
    return (
      <div>
        <Segment color='black'>
          <Button.Group size='mini' widths='4'>
            <Button onClick={processCourses}>Parse Class List</Button>
            <Button onClick={parseForFiles}>Parse Files</Button>
            <Button onClick={parseForPages}>Parse Page</Button>
            <Button onClick={async () => this.props.dispatch(parseAllClassesAction(await getCurrentTab()))}>Parse All Pages</Button>
          </Button.Group>
        </Segment>
      </div>
    )
  }
};

const mapStateToProps = state => state

export default connect(mapStateToProps)(ParserButtonsComponent)
