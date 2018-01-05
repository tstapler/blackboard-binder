import { Button, Segment } from 'semantic-ui-react'
import { selectAllFilesAction, selectUndownloadedFilesAction, unselectAllFilesAction } from '../actions/downloads'

import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

class SelectionComponent extends React.Component {
  render () {
    let selectionButton = {}
    if (_.isEmpty(this.props.selectedFilesById)) {
      selectionButton = {
        command: this.props.selectAllFiles,
        text: 'Select'
      }
    } else {
      selectionButton = {
        command: this.props.unselectAllFiles,
        text: 'Unselect'
      }
    }
    return (
      <div>
        <Segment color='black'>
          <Button.Group size='mini' widths='2' >
            <Button onClick={selectionButton.command}>{selectionButton.text} All Files</Button>
            <Button onClick={this.props.selectUndownloadedFiles}> Select Undownloaded Files</Button>
          </Button.Group>
        </Segment>
      </div>
    )
  };
}
function mapStateToProps (state) {
  return {
    selectedFilesById: state.downloads.selectedFilesById
  }
}

function mapDispatchToProps (dispatch) {
  return ({
    selectAllFiles: () => dispatch(selectAllFilesAction()) && console.log('Dispatching select all '),
    unselectAllFiles: () => dispatch(unselectAllFilesAction()),
    selectUndownloadedFiles: () => dispatch(selectUndownloadedFilesAction())
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectionComponent)
