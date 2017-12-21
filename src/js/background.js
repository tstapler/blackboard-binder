import '../img/icon-128.png'
import '../img/icon-34.png'

import { applyMiddleware, compose, createStore } from 'redux'

import { createLogger } from 'redux-logger'
import freeze from 'redux-freeze'
import reducer from './reducers'
import {wrapStore} from 'react-chrome-redux'

const store = createStore(reducer, compose(
      applyMiddleware(thunk, freeze, createLogger()),
    )) // a normal Redux store

window.store = store

wrapStore(store, {portName: 'BBBINDER'}) // make sure portName matches
