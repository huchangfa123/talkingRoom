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
import marked from 'marked';

/**
 * 聊天主界面
 */
@connect(
  state => ({
    curSelectedRoom: state.user.getIn(['curSelectedRoom']),
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
      let message = this.refs.userInput.innerText; // textContent会把换行符转化
      this.refs.userInput.innerText = '';
      this.props.send({
        From: {
          id: this.props.userData.id,
          name: this.props.userData.name,
          avatar: this.props.userData.avatar
        },
        roomId: this.props.curSelectedRoom.get('id'),
        msgType: 'NORMAL_MESSAGE',
        contentType: 'text',
        createdAt: new Date(),
        content: marked(message, {break: true})
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
    const roomIndex = this.props.messageList.findIndex(g => g.get('roomId') === this.props.curSelectedRoom.get('id'))
    let messages = this.props.messageList.get(roomIndex).get('messages')
    return (
      <div className="chat-panel">
        <GroupMessage />
        <div className="chat-panel-header">
          <div className="userHeadDiv">
            <div
              style={{
                marginLeft: '5px',
                color: 'white',
                width: '40px',
                lineHeight: '40px',
                textAlign: 'center',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: `${this.props.curSelectedRoom.get('avatar')}`
              }}
            >{this.props.curSelectedRoom.get('name').charAt(0)}</div>
            <p>{this.props.curSelectedRoom.get('name')}</p>
          </div>
          <div className="buttonDiv">
            <div>
              <i title="公告" className="iconfont chatpic">
                &#xe6e3;
              </i>
            </div>
            <div onClick={this.showGroupMessage.bind(this)}>
              <i title="群信息" className="iconfont chatpic">
                &#xe682;
              </i>
            </div>
          </div>
        </div>
        <div className="message-list">
          {messages.map((message, index) => (
              message.get('msgType') !== 'TIPS_MESSAGE' ?
              <MessageItem
                key={index}
                index={index}
                userName={message.get('From').get('name')}
                avatar={message.get('From').get('avatar')}
                message={message.get('content')}
                date={formatTime(message.get('createdAt'))}
                type={ message.get('From').get('id') !== this.props.userData.id? 'OTHERS_MESSAGE' : 'OWN_MESSAGE'}
              /> : ''
            )
          )}
        </div>
        <div className="input-box">
          <pre contentEditable={true} placeholder="输入消息" onKeyDown={this.handleInputKeyDown} ref="userInput" />
        </div>
      </div>
    );
  }
}
