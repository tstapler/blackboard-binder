import { Accordion, Header, Icon, Label, List, Segment } from 'semantic-ui-react'

import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { getPageIdFromUrl } from '../util.js'
import { selectFileAction, unselectFileAction } from '../actions/downloads'

class ClassesComponent extends React.Component {
  render () {
    const classes = mapFilesToClasses(this.props.filesById,
      this.props.pagesById,
      this.props.classesById)
    const classAccordion = this.createClassAccordion(classes)
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
  };

  createClassAccordion (classes) {
    let classPanels = []
    _.forEach(classes, (classObj, classId) => {
      let pagePanels = []
      _.forEach(classObj.pages, (pageObj, pageId) => {
        if (pageObj.files.length <= 0) { return {} }
        let pageContent = this.getPageContent(pageObj)
        pagePanels.push(
          {
            title: pageObj.title,
           content:{ content: (<div className="page-accordion-list">
                                  <List selection size="mini">{pageContent}</List>
                               </div>)
          }}
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
      classPanels.push({title:
        classObj.title,
        content: {content: classContent, key: classId}})
    })
    return (<Accordion panels={classPanels} />)
  }

  getPageContent (page) {
    return _.map(page.files, (file, key) => {
      let selected = _.has(this.props.selectedFilesById, file.id)
      return <List.Item active={selected} key={key} onClick={() => {
        console.log("Clicked item!")
        if(selected) {
          this.props.unselectFile(file.id)
        } else {
          this.props.selectFile(file.id)
        }
      }}>
        <List.Icon name={this.getFileIconClass(file.title)} />
        <List.Content>
          <List.Header>
            <span>{file.title}{' '}</span>
          </List.Header>
        </List.Content>
      </List.Item>
    }
    )
  }

  getFileIconClass (filename) {
    let extension = _.flow([_.split, _.last])(filename, '.')
    switch (extension) {
      case 'pdf':
        return 'file pdf outline'
      case 'mp4':
        return 'file video outline'
      case 'mp3':
        return 'file audio outline'
      case 'jpg': case 'jpeg': case 'png': case 'gif':
        return 'file image outline'
      case 'zip': case 'rar': case 'gz': case '7z':
        return 'file archive outline'
      case 'docx': case 'doc':
        return 'file word outline'
      case 'ppt':
        return 'file powerpoint outline'
      case 'xlsx': case 'xls':
        return 'file excel outline'
      default:
        return 'file outline'
    }
  }
}
function mapFilesToClasses (files, pages, classes) {
  if (_.isEmpty(classes)) return {}

  let classMap = {}
  _.forEach(classes, (classObj, classId) => {
    classMap[classId] = classObj
    classMap[classId].pages = {unknown: {title: 'Unknown Page', files: []}}
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
    if (classMap[classId].pages.hasOwnProperty(pageKey)) {
      classMap[classId].pages[pageKey].files.push(fileObj)
    } else {
      classMap[classId].pages['unknown'].files.push(fileObj)
    }
  })
  return classMap
}

function mapStateToProps (state) {
  return {
    classesById: state.classes.classesById,
    filesById: state.files.filesById,
    pagesById: state.pages.pagesById,
    selectedFilesById: state.downloads.selectedFilesById,
  }
}

function mapDispatchToProps (dispatch) {
  return ({
    selectFile: (fileId) => dispatch(selectFileAction(fileId)),
    unselectFile: (fileId) => dispatch(unselectFileAction(fileId))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassesComponent)
