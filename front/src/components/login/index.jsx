import React, { Component } from 'react';
import { connect, dispatch, bindActionCreators } from 'react-redux';
import './login.css';
import { login, register, autoLogin } from '../../action/UserAction';
import notification from '../notice';
import { Redirect } from 'react-router-dom';
import Main from '../main';
import cookie from 'js-cookie';
import { getRoomList } from '../../action/UserAction'
import '../../assert/css/icon.css';

@connect(
  state => ({
    registerResult: state.registerResult,
    loginResult: state.loginResult
  }),
  { register, login, autoLogin, getRoomList }
)
export default class Login extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      isLoading: false
    };
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

  async componentWillMount(prevProps, prevState) {
    const token = cookie.get('accessToken');
    // 如果cookie有token自动登录
    if (token) {
      let result = await this.props.autoLogin();
      if (this.props.loginResult) {
        await this.props.getRoomList({userData: this.props.loginResult});
        this.context.router.history.push('/main');
      } else {
        notification.warning('用户认证失败');
      }
    }
  }
　
  // 没有token在cookie的时候，手动登录
  async login() {
    let data = {
      name: this.state.userName,
      password: this.state.password
    };
    let result = await this.props.login(data);
    if (result.code !== 200) {
      notification.warning(result.message);
    } else {
      // 登录成功就获取房间信息
      if (this.props.loginResult) {
        await this.props.getRoomList({userData: this.props.loginResult});
        this.context.router.history.push('/main');
      } else {
        notification.warning('用户认证失败');
      }
    }
  }

  async registerButton() {
    let data = {
      name: this.state.userName,
      password: this.state.password
    };
    let result = await this.props.register(data);
    if (result.code === 400) {
      notification.error(result.message);
    } else {
      notification.success('注册成功');
    }
  }

  render() {
    return (
      <div className="login">
        <div className="title">chattingRoom</div>
        <div className="managerBlock">
          <div className="dataBlock">
            <div className="input-normal">
              <span>
                <i className="iconfont">&#xe739;</i>
                <input
                  type="text"
                  placeholder="用户名"
                  value={this.state.userName}
                  onChange={this.handleUserName.bind(this)}
                /> 
              </span>
            </div>
            <div className="input-normal">
              <span>
              <i className="iconfont">&#xe6e6;</i>
              <input
                type="password"
                placeholder="密码"
                value={this.state.password}
                onChange={this.handlePassword.bind(this)}
              />
              </span>
            </div>
          </div>
          <div className="clickBlock">
            <button className="btn" onClick={this.login.bind(this)}>
              登录
            </button>
            <button className="btn" onClick={this.registerButton.bind(this)}>
              注册
            </button>
          </div>
        </div>
      </div>
    );
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
