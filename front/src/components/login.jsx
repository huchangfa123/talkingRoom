import React, { Component } from 'react';
import { connect, dispatch, bindActionCreators } from 'react-redux';
import '../assert/css/login.css';
import { login, register } from '../action/UserAction';
import notification from './notice';

@connect(
  state => ({ registerResult: state.registerResult, loginResult: state.loginResult}),
  dispatch => bindActionCreators({login, register}, dispatch)
)
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      isLoading: false
    }
  }

  handleUserName(e) {
    let value = e.target.value;
    this.setState({
      userName: value
    });
  }

  handlePassword(e) {
    let value = e.target.value;
    this.setState({
      password: value
    });
  }

  login() {
    let data = {
      name: this.state.userName,
      password: this.state.password
    }
    this.props.login(data);
  }

  registerButton() {
    let data = {
      name: this.state.userName,
      password: this.state.password
    }
    this.props.register(data).then(res => {
      console.log('111', res);
    });
  }

  render() {
    return (
      <div className="login">
        <div className="managerBlock">
          <div><img className="userHead" src="http://www.17qq.com/img_qqtouxiang/22526416.jpeg" /></div>
          <div className="ioBlock">
            <div className="dataBlock">
              <div className="input-normal">
                <span>帐号:</span>
                <input type="text" placeholder="用户名" value={this.state.userName} onChange={this.handleUserName.bind(this)}/>
              </div>
              <div className="input-normal">
                <span>密码:</span>
                <input type="password" placeholder="密码" value={this.state.password} onChange={this.handlePassword.bind(this)}/>
              </div>
            </div>
            <div className="clickBlock">
              <button className="btn" onClick={this.login.bind(this)}>登录</button>
              <button className="btn" onClick={this.registerButton.bind(this)}>注册</button>              
            </div>
          </div>
        </div>
      </div>
    )
  }
}