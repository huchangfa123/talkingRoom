import React, { Component } from 'react';
import { connect } from 'react-redux';
import './messageItem.css';

export default class MessageItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let isOtherMessage = this.props.type === 'OTHERS_MESSAGE';
    return (
      <div className="messageItem"> 
        <div className="message"
          style={{ 
            direction: isOtherMessage? 'row': 'row-reverse',
            justifyContent: isOtherMessage? 'flex-start':'flex-end'
          }}
        >
          {
            this.props.type === 'OTHERS_MESSAGE' &&
            <div className="userHead">{this.props.userName.at(0)}</div>
          }
          <div className="userText"
            style={{
              alignItems: isOtherMessage? 'flex-start':'flex-end',
              marginRight: isOtherMessage? '45px' : 0,
              marginLeft: isOtherMessage? 0 : '45px'
            }}
          >
            <div className="textFrom">
              <span className="text-userName">{this.props.userName}</span>
              <span className="text-time">{this.props.date}</span>
            </div>
            <div className="textData"
              style={{
                backgroundColor: isOtherMessage? '#f1f1f1': '#b2e281'
              }}
            >
              {this.props.message}        
            </div>
          </div>
          {
            this.props.type === 'OWN_MESSAGE' &&
            <div className="userHead" 
              style={{
                marginRight: 0,
                marginLeft: '5px'
              }}
            >{this.props.userName.at(0)}</div>
          } 
        </div>
      </div>
    )
  }
}
