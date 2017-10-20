import React, { Component } from 'react';
import { connect, dispatch } from 'react-redux';
import '../assert/css/login.css'

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="login">
        <div className="managerBlock">
          <div><img className="userHead" src="http://www.17qq.com/img_qqtouxiang/22526416.jpeg" /></div>
          <div>
            <div className="input-normal">
              <span>帐号:</span>
              <input type="text" placeholder="用户名" />
            </div>
            <div className="input-normal">
              <span>密码:</span>
              <input type="password" placeholder="密码" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}