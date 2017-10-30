import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../assert/css/chatting.css';
import '../assert/css/icon.css';

export default class Chatting extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="chat-panel">
        <div className="chat-panel-header">
          <div className="userHeadDiv">
            <img src="http://www.17qq.com/img_qqtouxiang/22526416.jpeg" className="userHead"/>
            <p>huchangfa</p>
          </div>
          <div className="buttonDiv">
            <div>
              <i title="公告" className="iconfont chatpic">&#xe6e3;</i>
            </div>
            <div>
              <i title="群信息" className="iconfont chatpic">&#xe682;</i>
            </div>
          </div>
        </div>
        <div className="message-list"></div>
        <div className="toolbar">
          <div className="emoji" title="表情">
            <i className="iconfont">&#xe65c;</i>
          </div>
          <div className="pic">
            <i className="iconfont" title="上传图片">&#xe60d;</i>
          </div>
          <div className="code">
            <i className="iconfont" title="代码">&#xe6dc;</i>
          </div>
        </div>        
        <div className="input-box">
          <input type="text"/>
        </div>      
      </div>
    )
  }
}