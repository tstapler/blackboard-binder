import 'semantic-ui-css/semantic.min.css'
import '../css/popup.css'

import { Header, Icon, Segment } from 'semantic-ui-react'

import Greeting from './popup/greeting_component.jsx'
import Parser from './popup/ParserButtonsComponent.jsx'
import {Provider} from 'react-redux'
import React from 'react'
import {Store} from 'react-chrome-redux'
import { render } from 'react-dom'

const store = new Store({
  portName: 'BBBINDER' // communication port name
})

// Using react-chrome-redux https://github.com/tshaddix/react-chrome-redux
const unsubscribe = store.subscribe(() => {
  unsubscribe()
  render(
    <Provider store={store}>
      <div>
        <Segment vertical>
          <Header as='h1' size='medium' textAlign='center'>
            <Icon name='settings' circular />
            BlackBoard-Binder
          </Header>
        </Segment>
        <Greeting />
        <Parser />
      </div>
    </Provider>,
    window.document.getElementById('app-container')
  )
})
