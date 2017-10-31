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
          <div className="userHead">11</div>
          <div className="userText">
            <div className="textFrom">
              <span className="text-userName">huchangfa</span>
              <span className="text-time">14:22</span>
            </div>
            <div className="textData">
              haha        
            </div>
          </div>
        </div>
      </div>
    )
  }
}
