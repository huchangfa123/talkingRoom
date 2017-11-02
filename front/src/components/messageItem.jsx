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
        <div className="message"
          style={{ justifyContent: this.props.type === 'OTHERS_MESSAGE'? 'flex-start': 'flex-end'}}
        >
          {
            this.props.type === 'OTHERS_MESSAGE' &&
            <div className="userHead">{this.props.userName.at(0)}</div>
          } 
          <div className="userText"
            style={
              {alignItems: this.props.type === 'OTHERS_MESSAGE'? 'flex-start': 'flex-end'},
              {}
            }
          >
            <div className="textFrom">
              <span className="text-userName">{this.props.userName}</span>
              <span className="text-time">{this.props.date}</span>
            </div>
            <div className="textData">
              {this.props.message}        
            </div>
          </div>
           {
            this.props.type === 'OWN_MESSAGE' &&
            <div className="userHead">{this.props.userName.at(0)}</div>
          } 
        </div>
      </div>
    )
  }
}
