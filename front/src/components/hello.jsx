import React, { Component } from 'react';
import '../assert/css/component.css';
import io from 'socket.io';

export default class Hello extends Component {

  constructor(props) {
    super(props);
    this.ws = io.connect('http://192.168.1.165:3000');
  }
  
  async addMessage(from, msg) {
    let li = document.createElement('li');
    li.innerHTML = `<span>${from}</span>:${msg}`;
    document.querySelector('#chat_container').appendChild(li);
  }

  sendMessage(msg) {
    this.ws.emit('send.message', msg);
  }

  actionSend() {
    let textarea = document.querySelector('textarea');
    let msg = textarea.value.replace('\r\n', '').trim();
    if (!msg) { return; }
    sendMessage(msg);
    addMessage('你', msg);
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