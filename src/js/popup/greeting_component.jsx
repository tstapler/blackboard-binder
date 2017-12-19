import React from "react";
import icon from "../../img/icon-128.png"

export default class extends React.Component {

  constructor(props) {
        super(props);
        this.state = {
            list: Array(2).fill("hi")
        }
        this.handleList = this.handleList.bind(this);
  }

  handleList() {
    this.setState(prevState => ({
        list: Array(4).fill("hi")
    }));
    console.log(this);
  }

  render () {
    const listItems = this.state.list.map((item) => <li>{item}</li>);
    return (
      <div>
        <h1>Download List:</h1>
        <ul> {listItems} </ul>
        <button onClick={this.handleList}>download now</button>
      </div>
    )
  }
};
