import React, { Component, PropTypes } from 'react';
import '../assert/css/component.css';
import '../assert/css/icon.css';
import { connect, dispatch } from 'react-redux';
import { send } from '../action/UserAction';
import { Route, Switch } from 'react-router-dom';
import Chatting from './chatting';
import Setting from './setting';
// import { history } from '../index.jsx';

const mapStateToProps = (state) => {
  return {
    messageList: state.messageList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    messageSend: (message) => {
      dispatch(send(message))
    }
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Main extends Component {
  
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      path: ''
    }
  }

  goChatting() {
    this.context.router.history.push({ pathname: '/main/chatting' });
  }

  goSetting() {
     this.context.router.history.push({ pathname: '/main/setting' });    
  }
  
  render() {
    return (
      <div className="wrapper">
        <div className="leaderBar">
          <div className="logo"></div>
          <div className="nav-list">
            <div className={`nav-list-item ${/\/setting$/.test(this.props.match.path)? '' : 'selected'}`} onClick={this.goChatting.bind(this)} title="聊天">
              <i className="iconfont headpic">&#xe657;</i>
            </div>
            <div className={`nav-list-item ${/\/setting$/.test(this.props.match.path)? 'selected' : ''}`} onClick={this.goSetting.bind(this)} title="设置">
              <i className="iconfont headpic">&#xe656;</i>
            </div>            
          </div>
          <div className="user-panel"></div>          
        </div>
        <div className="mainBody">
          <Route exact path="/main" component={Chatting}/>
          <Route path="/main/chatting" component={Chatting}/>
          <Route path="/main/setting" component={Setting}/>          
        </div>
      </div>
    )
  }
}



