import { Button, Segment } from 'semantic-ui-react'
import { finishParseAction, parseAllClassesAction } from '../actions/parser'
import { getCurrentTab, parseForFiles, parseForPages, processCourses } from '../parserControl'

import React from 'react'
import { connect } from 'react-redux'

class ParserButtonsComponent extends React.Component {
  render () {
    let parserControlButton = null
    console.log(this.props)
    if (this.props.parsing) {
      parserControlButton = <Button onClick={this.props.stopParsing}>Stop Parser</Button>
    } else {
      parserControlButton = <Button onClick={this.props.startParsing}>Start Parsing All Pages</Button>
    }
    return (
      <div>
        <Segment color='black'>
          <Button.Group size='mini' widths='4'>
            <Button onClick={this.props.processCourses}>Parse Class List</Button>
            <Button onClick={this.props.parseFiles}>Parse Files</Button>
            <Button onClick={this.props.parsePages}>Parse Pages</Button>
            {parserControlButton}
          </Button.Group>
        </Segment>
      </div>
    )
  }
};

const mapDispatchToProps = dispatch => ({
  startParsing: async () => dispatch(parseAllClassesAction(await getCurrentTab())),
  stopParsing: async () => dispatch(finishParseAction()),
  processCourses: async () => {
    let tab = await getCurrentTab()
    return processCourses(tab.id)
  },
  parseFiles: async () => {
    let tab = await getCurrentTab()
    return parseForFiles(tab.id)
  },
  parsePages: async () => {
    let tab = await getCurrentTab()
    return parseForPages(tab.id)
  }

})

const mapStateToProps = state => {
  return {parsing: state.parser.parsing}
}

export default connect(mapStateToProps, mapDispatchToProps)(ParserButtonsComponent)
