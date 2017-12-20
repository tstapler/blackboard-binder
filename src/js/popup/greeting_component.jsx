import React from "react";
import {  Divider, Header, Icon, Label, List, Segment } from 'semantic-ui-react';

export default class extends React.Component {
  render () {

    const listItems = Object.keys(this.props.classes)
    const list = listItems.map((key, index) =>
      <List.Item as='a' key={index}>
        <List.Icon name='right triangle'/>
        <List.Content>
          <List.Header>
            <span>{this.props.classes[key].name}{' '}</span>
            <Label size='mini' circular
                   color='black' >
              {this.props.classes[key].count}
            </Label>
          </List.Header>

        </List.Content>
      </List.Item>
    );
    return (
      <div>
      <Segment color='black'>
        <Header as='h2' size='small' dividing>
          <Icon name='book'/>
          Course List
        </Header>
        <List size='tiny' >{list}</List>
      </Segment>
      </div>
    )
  }
};
