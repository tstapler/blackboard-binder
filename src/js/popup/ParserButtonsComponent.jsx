import { Button, Segment } from 'semantic-ui-react'
import { finishParseAction, parseAllClassesAction } from '../actions/parser'
import { getCurrentTab, parseForFiles, parseForPages, processCourses } from '../parserControl'

import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { downloadSelectedFilesAction } from '../actions/downloads'

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
      <div className='parser-control-container'>
        <Segment color='black'>
          <Button.Group size='mini' widths='5'>
            {parserControlButton}
            <Button onClick={this.props.downloadSelectedFiles}>Download {this.props.selectedFilesNum} Files</Button>
          </Button.Group>
        </Segment>
      </div>
    )
  }
};

const mapDispatchToProps = dispatch => ({
  startParsing: async () => dispatch(parseAllClassesAction(await getCurrentTab())),
  stopParsing: () => dispatch(finishParseAction()),
  downloadSelectedFiles: () => dispatch(downloadSelectedFilesAction()),
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
  return {parsing: state.parser.parsing,
    selectedFilesNum: _.keys(state.downloads.selectedFilesById).length }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParserButtonsComponent)
