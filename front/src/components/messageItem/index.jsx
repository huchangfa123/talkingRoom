import React, { Component } from 'react';
import { connect } from 'react-redux';
import './messageItem.css';
import hljs from 'highlight.js';
import { formatMessageContent } from '../../util/format';
export default class MessageItem extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount(){
    var els = document.querySelectorAll('code');
    for (var i = 0; i < els.length; i++) {
      if (!els[i].classList.contains('hljs')) {
        await hljs.highlightBlock(els[i]);
      }
    }
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
            isOtherMessage &&
            <div className="userHead" style={{backgroundColor: `${this.props.avatar}`}}>{this.props.userName.at(0)}</div>
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
              dangerouslySetInnerHTML={{__html: formatMessageContent(this.props.message)}}
              style={{
                backgroundColor: isOtherMessage? '#f1f1f1': '#b2e281'
              }}
            >     
            </div>
          </div>
          {
            !isOtherMessage &&
            <div className="userHead" 
              style={{
                marginRight: 0,
                marginLeft: '5px',
                backgroundColor: `${this.props.avatar}`
              }}
            >{this.props.userName.at(0)}</div>
          } 
        </div>
      </div>
    )
  }
}
