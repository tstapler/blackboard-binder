import '../assets/icon-128.png'
import '../assets/icon-48.png'
import '../assets/icon-16.png'

import { applyMiddleware, compose, createStore } from 'redux'

import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { enableBatching } from 'redux-batched-actions';
import freeze from 'redux-freeze'
import reducer from './reducers'
import sagas from './sagas'
import {wrapStore} from 'react-chrome-redux'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(enableBatching(reducer), compose(
      applyMiddleware(sagaMiddleware, freeze, createLogger({diff: true}))
    )) // a normal Redux store

window.store = store

sagaMiddleware.run(sagas)

wrapStore(store, {portName: 'BBBINDER'}) // make sure portName matches
