import { Button, Segment } from 'semantic-ui-react'
import { getCurrentTab, parseForFiles, parseForPages, processCourses } from '../parserControl'

import React from 'react'
import { connect } from 'react-redux'
import { parseAllClassesAction } from '../actions/parser'

class ParserButtonsComponent extends React.Component {
  render () {
    return (
      <div>
        <Segment color='black'>
          <Button.Group size='mini' widths='4'>
            <Button onClick={async () => this.props.dispatch(parseAllClassesAction(await getCurrentTab()))}>Parse All Pages</Button>
            <Button onClick={async () => processCourses(await getCurrentTab())}>Parse Class List</Button>
            <Button onClick={async () => parseForFiles(await getCurrentTab())}>Parse Files</Button>
            <Button onClick={async () => parseForPages(await getCurrentTab())}>Parse Pages</Button>
          </Button.Group>
        </Segment>
      </div>
    )
  }
};

const mapStateToProps = state => state

export default connect(mapStateToProps)(ParserButtonsComponent)
