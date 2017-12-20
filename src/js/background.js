import '../img/icon-128.png'
import '../img/icon-34.png'

import { applyMiddleware, compose } from 'redux'

import DevTools from './containers/DevTools'
import { createLogger } from 'redux-logger'
import { createStore } from 'redux'
import freeze from 'redux-freeze'
import reducer from './reducers'
import { render } from 'react-dom'
import {wrapStore} from 'react-chrome-redux'

const store = createStore(reducer, compose(
      applyMiddleware(freeze, createLogger()),
      DevTools.instrument()
    )) // a normal Redux store

window.store = store

wrapStore(store, {portName: 'BBBINDER'}) // make sure portName matches
