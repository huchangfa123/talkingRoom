import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assert/css/messageItem.css';

export default class MessageItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="messageItem">
        <div className="message">
          <img className="userHead" src=""/>
          <div className="userText">
            <div className="textFrom">111</div>
            <div className="textData">222</div>
          </div>
        </div>
      </div>
    )
  }
}
