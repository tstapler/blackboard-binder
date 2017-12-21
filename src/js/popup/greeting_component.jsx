import { Header, Icon, Label, List, Segment } from 'semantic-ui-react'

import React from 'react'
import { connect } from 'react-redux'

class GreetingCompoennt extends React.Component {
  render () {
    const listItems = Object.keys(this.props.classesById)
    const list = listItems.map((key, index) =>
      <List.Item as='a' key={index}>
        <List.Icon name='right triangle' />
        <List.Content>
          <List.Header>
            <span>{this.props.classesById[key].title}{' '}</span>
          </List.Header>

        </List.Content>
      </List.Item>
    )
    return (
      <div>
        <Segment color='black'>
          <Header as='h2' size='small' dividing>
            <Icon name='book' />
          Course List
        </Header>
          <List size='tiny' >{list}</List>
        </Segment>
      </div>
    )
  }
};

function mapStateToProps (state) {
  return { classesById: state.classes.classesById,
           filesById: state.files.filesById}
}

export default connect(mapStateToProps)(GreetingCompoennt)
