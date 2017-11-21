import React, { Component, PropTypes } from 'react';
import '../assert/css/main.css';
import '../assert/css/icon.css';
import { connect, dispatch } from 'react-redux';
import { send } from '../action/UserAction';
import { Route, Switch } from 'react-router-dom';
import Chatting from './chatting';
import Setting from './setting';
import ManagerHead from './managerHeader';
import ManagerBody from './managerBody';
import BarHeader from './barHeader';
import SideBar from './sideBar';
import MaskLayout from './maskLayout';

// import { history } from '../index.jsx';

const mapStateToProps = state => {
  return {
    sideBarType: state.ui.sideBarType
  };
};

const mapDispatchToProps = dispatch => {
  return {
    messageSend: message => {
      dispatch(send(message));
    }
  };
};

@connect(mapStateToProps, mapDispatchToProps)
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
    this.context.router.history.push({ pathname: '/main/chatting' });
  }

  goSetting() {
    this.context.router.history.push({ pathname: '/main/setting' });
  }

  render() {
    this.state.selected = /\/setting$/.test(this.props.location.pathname);
    const { sideBarType } = this.props;
    console.log('lala', sideBarType);
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
              <Route exact path="/main" component={Chatting} />
              <Route path="/main/chatting" component={Chatting} />
              <Route path="/main/setting" component={Setting} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
