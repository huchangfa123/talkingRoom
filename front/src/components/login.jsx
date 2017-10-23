import React, { Component } from 'react';
import { connect, dispatch } from 'react-redux';
import '../assert/css/login.css';
import { login, register } from '../action/UserAction';

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => {
      dispatch(login(data));
    },
    register: (data) => {
      dispatch(register(data));
    }
  }
}

@connect(null, mapDispatchToProps)
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: ''
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

  register() {
    let data = {
      name: this.state.userName,
      password: this.state.password
    }
    this.props.register(data);
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
              <button className="btn" onClick={this.register.bind(this)}>注册</button>              
            </div>
          </div>
        </div>
      </div>
    )
  }
}