import '../img/icon-128.png'
import '../img/icon-34.png'

import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import freeze from 'redux-freeze'
import reducer from './reducers'
import {wrapStore} from 'react-chrome-redux'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, compose(
      applyMiddleware(sagaMiddleware, freeze, createLogger())
    )) // a normal Redux store

window.store = store

sagaMiddleware.run(sagas)

wrapStore(store, {portName: 'BBBINDER'}) // make sure portName matches
