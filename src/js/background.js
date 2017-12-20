import '../img/icon-128.png'
import '../img/icon-34.png'
import {wrapStore} from 'react-chrome-redux'
import { createStore } from 'redux'
import reducer from './reducers'

const store = createStore(reducer) // a normal Redux store

window.store = store

wrapStore(store, {portName: 'BBBINDER'}) // make sure portName matches
