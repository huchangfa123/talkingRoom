import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './chatting.css';
import '../../assert/css/icon.css';
import MessageItem from '../messageItem';
import { send } from '../../action/UserAction';
import ui from '../../action/UiAction';
import GroupMessage from '../groupMessage';
import { formatTime } from '../../util/format'

/**
 * 聊天主界面
 */
@connect(
  state => ({
    messageList: state.user.getIn(['messageList']),
    userData: state.loginResult
  }),
  { send }
)
export default class Chatting extends Component {
  constructor(props) {
    super(props);
  }

  handleOnScroller(){
    let scrollbox = document.getElementsByClassName('message-list');
    scrollbox[0].scrollTop = scrollbox[0].scrollHeight;
  }

  handleInputKeyDown = e => {
    if (e.keyCode === 9) {
      e.preventDefault();
      return;
    }
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      let message = this.refs.userInput.value;
      this.refs.userInput.value = '';
      this.props.send({
        From: {
          id: this.props.userData.id,
          name: this.props.userData.name
        },
        msgType: 'NORMAL_MESSAGE',
        contentType: 'text',
        createdAt: new Date(),
        content: message
      });
    }
  };

  componentDidMount(){
    this.handleOnScroller();
  }

  componentDidUpdate(){
    this.handleOnScroller();    
  }

  showGroupMessage() {
    ui.showGroupMessage();
    ui.showMaskLayout();
  }

  render() {
    console.log('asdasdasd', this.props.userData.id)
    return (
      <div className="chat-panel">
        <GroupMessage />
        <div className="chat-panel-header">
          <div className="userHeadDiv">
            <img src="http://www.17qq.com/img_qqtouxiang/22526416.jpeg" className="userHead" />
            <p>huchangfa</p>
          </div>
          <div className="buttonDiv">
            <div>
              <i title="公告" className="iconfont chatpic">
                &#xe6e3;
              </i>
            </div>
            <div>
              <i title="群信息" className="iconfont chatpic" onClick={this.showGroupMessage.bind(this)}>
                &#xe682;
              </i>
            </div>
          </div>
        </div>
        <div className="message-list">
          {this.props.messageList.map((message, index) => (
              message.msgType !== 'TIPS_MESSAGE' ?
              <MessageItem
                key={index}
                userName={message.From.name}
                message={message.content}
                date={formatTime(message.createdAt)}
                type={ message.From.id !== this.props.userData.id? 'OTHERS_MESSAGE' : 'OWN_MESSAGE'}
              /> : ''
            )
          )}
        </div>
        <div className="toolbar">
          <div className="emoji" title="表情">
            <i className="iconfont">&#xe65c;</i>
          </div>
          <div className="pic">
            <i className="iconfont" title="上传图片">
              &#xe60d;
            </i>
          </div>
          <div className="code">
            <i className="iconfont" title="代码">
              &#xe6dc;
            </i>
          </div>
        </div>
        <div className="input-box">
          <input type="text" placeholder="输入消息" onKeyDown={this.handleInputKeyDown} ref="userInput" />
        </div>
      </div>
    );
  }
}
