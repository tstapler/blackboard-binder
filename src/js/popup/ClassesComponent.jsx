import { Accordion, Header, Icon, Label, List, Segment } from 'semantic-ui-react'
import { selectFileAction, unselectFileAction } from '../actions/downloads'

import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { getPageIdFromUrl } from '../util.js'

class ClassesComponent extends React.Component {
  render () {
    const classes = mapFilesToClasses(this.props.filesById,
      this.props.pagesById,
      this.props.classesById)
    const classAccordion = this.createClassAccordion(classes)
    return (
        <Segment color='black' vertical>
          <Header as='h2' size='small' dividing>
            <Icon name='book' />
            Course List
          </Header>
          <div className='classes-accordion-container'>
              {classAccordion}
          </div>
        </Segment>
    )
  };

  createClassAccordion (classes) {
    let classPanels = []
    _.forEach(classes, (classObj, classId) => {
      let pagePanels = []
      _.forEach(classObj.pages, (pageObj, pageId) => {
        if (pageObj.files.length <= 0) { return {} }
        let pageContent = this.getPageContent(pageObj)
        let pageKey = pageId + "-" + pageObj.files[0].id
        pagePanels.push(
          {
            title: pageObj.title,
            content: { content: (<div className='page-accordion-list'>
              <List selection size='mini'>{pageContent}</List>
              </div>),
              key: pageKey
            }
          }
        )
      })
      let classContent = (<div className='page-accordion'>
        <Accordion.Accordion
          panels={pagePanels} />
      </div>)

      let classTitle = {content: <span>{classObj.title + " "}
        <Label size='mini' circular color="black">
        {classObj.fileCount}</Label></span>, key: "title-" + classId
      }
      classPanels.push({title: classTitle,
        content: {content: classContent, key: classId}})
    })
    return (<Accordion panels={classPanels} />)
  }

  getPageContent (page) {
    return _.map(page.files, (file, index) => {
      let selected = _.has(this.props.selectedFilesById, file.id)
      let downloaded = _.has(this.props.downloadedFilesById, file.id)
      return (<List.Item active={selected} key={file.id} onClick={() => {
        if (selected) {
          this.props.unselectFile(file.id)
        } else {
          this.props.selectFile(file.id)
        }
      }}
       className={(downloaded) ? "downloaded" : ""}>
        <List.Icon name={this.getFileIconClass(file.title)} />
        <List.Content>
          <List.Header>
            <span>{file.title}{' '}</span>
            { (downloaded) ? <Icon name="download"/> : ""}
          </List.Header>
        </List.Content>
      </List.Item>)
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
    downloadedFilesById: state.downloads.downloadedFilesById
  }
}

function mapDispatchToProps (dispatch) {
  return ({
    selectFile: (fileId) => dispatch(selectFileAction(fileId)),
    unselectFile: (fileId) => dispatch(unselectFileAction(fileId))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassesComponent)
