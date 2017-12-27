import { Accordion, Header, Icon, Label, List, Segment } from 'semantic-ui-react'

import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { getPageIdFromUrl } from '../util.js'

class ClassesComponent extends React.Component {
  render () {
    const classes = mapFilesToClasses(this.props.filesById,
                         this.props.pagesById,
                         this.props.classesById)
    const classAccordion = createClassAccordion(classes)
    return (
      <div className ="classes-accordion-container">
        <Segment color='black' vertical>
          <Header as='h2' size='small' dividing>
            <Icon name='book' />
            Course List
          </Header>
          {classAccordion}
        </Segment>
      </div>
    )
  }
};

function createClassAccordion(classes){
  let classCount = 0
  let classPanels = []
  _.forEach(classes, (classObj, classId) => {
    let pagePanels = []
    _.forEach(classObj.pages, (pageObj, pageId) => {
       if(pageObj.files.length <= 0) { return {}}
       let pageContent = getPageContent(pageObj)
       pagePanels.push(
        {
           title: pageObj.title,
           content:{ content: (<div className="page-accordion-list">
                                  <List size="mini">{pageContent}</List>
                               </div>),
           key: pageId}
        }
      )
    })
    let classContent = (<div className="page-accordion">
                          <Label size='mini' >
                            Files found: {classObj.fileCount}
                          </Label>
                          <Label size='mini' >
                            Page count: {_.size(classObj.pages) - 1}
                          </Label>
                          <Accordion.Accordion key={classId}
                              panels={pagePanels} />
                        </div>)
    classPanels.push({title:classObj.title,
                      content: {content: classContent, key: classId}})
  })

  return (<Accordion panels={classPanels} />)
}

function getPageContent(page){
  return _.map(page.files, (course, key) =>
          <List.Item as='a' key={key}>
            <List.Icon name='right triangle' />
            <List.Content>
              <List.Header>
                <span>{course.title}{' '}</span>
              </List.Header>
            </List.Content>
          </List.Item>
      )
}

function mapFilesToClasses (files, pages, classes) {
  if (_.isEmpty(classes)) return {}

  let classMap = {}
  _.forEach(classes, (classObj, classId) => {
    classMap[classId] = classObj
    classMap[classId].pages = {unknown : {title: "Unknown Page", files: []}}
    classMap[classId].fileCount = 0
  })
  _.forEach(pages, (pageObj, pageId) => {
    let classId = pageObj.courseId
    classMap[classId].pages[pageId] = pageObj
    classMap[classId].pages[pageId].files = []
  })
  _.forEach(files, (fileObj, fileId) => {
    let classId = fileObj.courseId
    let pageKey = getPageIdFromUrl(fileObj.parentUrl)
    classMap[classId].fileCount++
    if(classMap[classId].pages.hasOwnProperty(pageKey)){
        classMap[classId].pages[pageKey].files.push(fileObj)
    } else {
      classMap[classId].pages["unknown"].files.push(fileObj)
    }
  })
  return classMap
}

function mapStateToProps (state) {
  return {
          classesById: state.classes.classesById,
          filesById: state.files.filesById,
          pagesById: state.pages.pagesById
          }
}

export default connect(mapStateToProps)(ClassesComponent)
