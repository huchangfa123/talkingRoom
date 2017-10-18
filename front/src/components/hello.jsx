import React, { Component } from 'react';
import '../assert/css/component.css';
import io from 'socket.io';
import { connect, dispatch } from 'react-redux';
import { send } from '../action/UserAction'

const mapStateToProps = (state) => {
  return {
    messageList: state.messageList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    messageSend: (message) => {
      dispatch(send(message))
    }
  }
}

@connect(mapStateToProps, mapDispatchToProps)

export default class Hello extends Component {

  constructor(props) {
    super(props);
  }

  actionSend() {
    let textarea = document.querySelector('textarea');
    let msg = textarea.value.replace('\r\n', '').trim();
    if (!msg) { return; }
    console.log(msg);
    this.props.messageSend(msg);
    console.log('messageLi1st:', this.props.messageList);
    textarea.value = '';
  }

  render() {
    let messageRenderList = this.props.messageList.map((item, index) => <li key={index}> {item} </li>)
    return (
      <div className="wrapper">
        <div className="content">
          <ul id="chat_container">
            {messageRenderList}
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



