import React, { Component } from 'react';
import '../assert/css/component.css';
import '../assert/css/icon.css';
import { connect, dispatch } from 'react-redux';
import { send } from '../action/UserAction';
import { Route, Switch, Redirect } from 'react-router-dom';
import Chatting from './chatting';
import Setting from './setting';

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

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      path: ''
    }
  }
  
  redirectTo(path) {
    this.setState({
      redirect: true,
      path
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to ={`${this.state.path}`}/>
    }
    let messageRenderList = this.props.messageList.map((item, index) => <li key={index}> {item} </li>)
    return (
      <div className="wrapper">
        <div className="leaderBar">
          <div className="logo"></div>
          <div className="nav-list">
            <div className={`nav-list-item ${/\/setting$/.test(this.props.match.path)? '' : 'selected'}`}>
              <i className="iconfont" onClick={this.redirectTo.bind(this, '/main/chatting')}>&#xe657;</i>
            </div>
            <div className={`nav-list-item ${/\/setting$/.test(this.props.match.path)? 'selected' : ''}`}>
              <i className="iconfont" onClick={this.redirectTo.bind(this, '/main/setting')}>&#xe656;</i>
            </div>            
          </div>
          <div className="user-panel"></div>          
        </div>
        <div className="mainBody">        
        </div>
      </div>
    )
  }
}



