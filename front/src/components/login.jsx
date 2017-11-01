import React, { Component } from 'react';
import { connect, dispatch, bindActionCreators } from 'react-redux';
import '../assert/css/login.css';
import { login, register } from '../action/UserAction';
import notification from './notice';
import { Redirect } from 'react-router-dom';
import socketServer from '../frameworks/Socket'

@connect(state => ({
  registerResult: state.registerResult,
  loginResult: state.loginResult
}), {register, login})
export default class Login extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

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

  async login() {
    let data = {
      name: this.state.userName,
      password: this.state.password
    }
    let result = await this.props.login(data);
    if (result.code !== 200) {
      notification.warning(result.message);
    } else {
      if (this.props.loginResult) {
        await socketServer();
        this.context.router.history.push('/main');
      } else {
        notification.warning('用户认证失败')
      }
    }
  }

  async registerButton() {
    let data = {
      name: this.state.userName,
      password: this.state.password
    }
    let result = await this.props.register(data);
    if (result.code === 400) {
      notification.error(result.message)     
    } else {
      notification.success('注册成功')
    }
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

// 非装饰器写法
// export default connect(
//   (state, props) => ({
//     registerResult: state.registerResult,
//     loginResult: state.loginResult
//   }),
//   {
//     register,
//     login
//   }
// )(Login)