import { Header, Icon, Label, List, Segment } from 'semantic-ui-react'

import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

class ClassesComponent extends React.Component {
  render () {
    const classesLi = createClassList(this.props.filesById,
                                        this.props.classesById)
    return (
      <div>
        <Segment color='black'>
          <Header as='h2' size='small' dividing>
            <Icon name='book' />
          Course List
        </Header>
          <List size='tiny' >{classesLi}</List>
        </Segment>
      </div>
    )
  }
};

function createClassList (filesById, classesById) {
  let classes = mapFilesToClasses(filesById, classesById)
  return _.map(classes, (course, key) =>
    <List.Item as='a' key={key}>
      <List.Icon name='right triangle' />
      <List.Content>
        <List.Header>
          <span>{course.title}{' '}</span>
          <Label size='mini' circular color='black' >
            {course.files.length}
          </Label>
        </List.Header>
      </List.Content>
    </List.Item>
  )
}

function mapFilesToClasses (files, classes) {
  if (_.isEmpty(classes)) return {}

  let classesWithFiles = {}
  _.forEach(classes, (value, key) => {
    classesWithFiles[key] = value
    classesWithFiles[key].files = []
  })
  _.forEach(files, (value, key) => {
    classesWithFiles[value.courseId].files.push(value)
  })
  return classesWithFiles
}

function mapStateToProps (state) {
  return { classesById: state.classes.classesById,
    filesById: state.files.filesById}
}

export default connect(mapStateToProps)(ClassesComponent)
