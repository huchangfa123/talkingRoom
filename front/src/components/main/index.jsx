import React, { Component, PropTypes } from 'react';
import './main.css';
import '../../assert/css/icon.css';
import { connect, dispatch } from 'react-redux';
import { autoLogin } from '../../action/UserAction';
import { Route, Switch } from 'react-router-dom';
import Chatting from '../chatting';
import Setting from '../setting';
import ManagerHead from '../managerHeader';
import ManagerBody from '../managerBody';
import BarHeader from '../barHeader';
import SideBar from '../sideBar';
import MaskLayout from '../maskLayout';
import { closeAllWindows } from '../../util/ui';
import { loginResult } from '../../reducers/auth';
import socketServer from '../../frameworks/Socket';
import { getRoomList } from '../../action/UserAction';
import ui from '../../action/UiAction'

class defaultChattingPage extends Component {
  render() {
    return (
      <div />
    )
  }
}

@connect(
  state => ({
    sideBarType: state.ui.getIn(['sideBarType']),
    loginResult: state.loginResult,
    getInRoom: state.ui.getIn(['getInRoom'])
  }),
  { autoLogin, getRoomList }
)
export default class Main extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      path: '',
      selected: /\/setting$/.test(this.props.match.path)
    };
  }

  goChatting() {
    ui.getOutRoom();
    this.context.router.history.push({ pathname: '/main/chatting' });
  }

  goSetting() {
    this.context.router.history.push({ pathname: '/main/setting' });
  }
　
  // 为调试方便设置的在主聊天页面的自动登录，一旦有token自动登录
  async componentDidMount() {
    if (!this.props.loginResult) {
      await this.props.autoLogin();
      if (!this.props.loginResult) {
        this.context.router.history.push('/');
      } else {
        await this.props.getRoomList({userData: this.props.loginResult});
      }
    }
  }
　
  async componentWillMount() {
    if (window.Notification && (window.Notification.permission === 'default' || window.Notification.permission === 'denied')) {
      window.Notification.requestPermission();
    }
    const mainBody = await document.getElementsByClassName('mainWindow');
    mainBody[0].addEventListener('click', e => {
      closeAllWindows();
    });
  }

  render() {
    this.state.selected = /\/setting$/.test(this.props.location.pathname);
    const { sideBarType } = this.props;
    return (
      <div className="mainWindow">
        <MaskLayout />
        <div className="wrapper">
          <div className="leaderBar">
            <div className="logo" />
            <div className="nav-list">
              <div
                className={`nav-list-item ${this.state.selected ? '' : 'selected'}`}
                onClick={this.goChatting.bind(this)}
                title="聊天"
              >
                <i className="iconfont headpic">&#xe657;</i>
              </div>
              <div
                className={`nav-list-item ${this.state.selected ? 'selected' : ''}`}
                onClick={this.goSetting.bind(this)}
                title="设置"
              >
                <i className="iconfont headpic">&#xe656;</i>
              </div>
            </div>
            <div className="user-panel" />
          </div>
          <div className="mainBody">
            <div className="chattingManager">
              {sideBarType === null || sideBarType === 'back' ? <ManagerBody /> : <SideBar />}
            </div>
            <div className="chattingBody">
              <Route exact path="/main" component={defaultChattingPage} />
              <Route path="/main/chatting" component={this.props.getInRoom? Chatting : defaultChattingPage} />
              <Route path="/main/setting" component={Setting} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
