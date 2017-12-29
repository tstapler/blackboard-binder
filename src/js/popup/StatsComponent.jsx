
import { Label, Segment } from 'semantic-ui-react'
import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

class StatsComponent extends React.Component {
  render () {
    return (
      <Segment textAlign="center" vertical color="black">
        <Label.Group size="mini">
          <Label>Total Files: {_.size(this.props.filesById)}</Label>
          <Label color="grey">Selected Files: {_.size(this.props.selectedFilesById)}</Label>
          <Label color="green">Dowloaded Files: {_.size(this.props.downloadedFilesById)}</Label>
        </Label.Group>
      </Segment>
  )
  };
}

function mapStateToProps (state) {
  return {
    filesById: state.files.filesById,
    selectedFilesById: state.downloads.selectedFilesById,
    downloadedFilesById: state.downloads.downloadedFilesById
  }
}

export default connect(mapStateToProps)(StatsComponent)
