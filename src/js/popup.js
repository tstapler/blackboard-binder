import "../css/popup.css";
import Greeting from "./popup/greeting_component.jsx";
import Parser from "./popup/full_parse_component.jsx";
import React from "react";
import { render } from "react-dom";

render(
  <div>
    <Greeting/><Parser/>
  </div>,
  window.document.getElementById("app-container")
);
