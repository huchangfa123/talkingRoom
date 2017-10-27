import React, { Component } from 'react';
import '../assert/css/component.css';
import '../assert/css/icon.css';
import { connect, dispatch } from 'react-redux';
import { send } from '../action/UserAction'

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
  }
  
  render() {
    let messageRenderList = this.props.messageList.map((item, index) => <li key={index}> {item} </li>)
    return (
      <div className="wrapper">
        <div className="leaderBar">
          <div className="logo">
            <img src="http://www.qt86.com/cache/1509073545_192429.png"/>
          </div>
          <div className="nav-list">
            <div className="nav-list-item selected"><i className="iconfont">&#xe657;</i></div>
            <div className="nav-list-item"><i className="iconfont">&#xe656;</i></div>            
          </div>
          <div className="user-panel"></div>          
        </div>
        <div className="mainBody">
          <div className="message-list"></div>
          <div className="toolBar"></div>
          <div className="inputBox"></div>          
        </div>
      </div>
    )
  }
}



