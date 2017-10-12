import React, { Component } from 'react';
import '../assert/css/component.css';
import io from 'socket.io';
import { connect, dispatch } from 'react-redux';
import { test } from '../action/UserAction'

export default class Hello extends Component {

  constructor(props) {
    super(props);
  }
  
  addMessage(from, msgList) {
    let doc = document.createDocumentFragment();
    for(let msg of msgList) {
      let li = document.createElement('li');
      li.innerHTML = `<span>${from}</span>:${msg}`;
      doc.appendChild(li);
    }
    document.querySelector('#chat_container').appendChild(doc);
  }

  actionSend() {
    let textarea = document.querySelector('textarea');
    let msg = textarea.value.replace('\r\n', '').trim();
    if (!msg) { return; }
    this.props.messageSend(msg);
    this.addMessage('huchangfa', this.props.messageList);
    textarea.value = '';
  }

  render() {

    return (
      <div className="wrapper">
         <div className="content">          
          <ul id="chat_container">
          </ul>
         </div>
         <div className="action">
          <textarea ></textarea>
          <div className="bottom">
            <button className="btn">清屏</button>
            <button className="btn" onClick={this.actionSend.bind(this)}>发送</button>
          </div>
         </div>
      </div>
    )
  }
}

const mapMessageList = (state) => {
  return {
    messageList: state.messageList
  }
}

const mapDispatch = (dispatch) => {
  return {
    messageSend: (message) => {
      dispatch(test(message))
    }
  }
}

export const ReduxHello = connect(mapMessageList, mapDispatch)(Hello);

