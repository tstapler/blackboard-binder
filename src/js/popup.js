import "../css/popup.css";
import Greeting from "./popup/greeting_component.jsx";
import Parser from "./popup/full_parse_component.jsx";
import React from "react";
import {Provider} from 'react-redux';
import {Store} from 'react-chrome-redux';
import { render } from "react-dom";

const store = new Store({
  portName: 'BBBINDER' // communication port name
});

// Using react-chrome-redux https://github.com/tshaddix/react-chrome-redux
store.ready().then(() => {
  render(
    <Provider store={store}>
      <Greeting/><Parser/>
    </Provider>,
    window.document.getElementById("app-container")
  )
});
