import React, { Component } from 'react';
import { connect } from 'react-redux';
import FloatPanel from '../floatPanel';
import ui from '../../action/UiAction';
import './groupMessage.css'

/**
 * 结合floatPanel的群信息右边弹框组件
 */
@connect(state => ({
  curSelectedRoom: state.user.getIn(['curSelectedRoom']),
  show: state.ui.getIn(['showGroupMessage'])
}))
export default class GroupMessage extends Component {
  render() {
    const { show } = this.props;
    return (
      <FloatPanel title="群信息" show={show}>
        <div className="group-info">
          <div className="content">在线人数:<span>{this.props.curSelectedRoom.get('onlineUsers').size}</span></div>
          <div className="userlist">
            {
              this.props.curSelectedRoom.get('onlineUsers').map((user, index) => (
                <div className="userItem" key={index}>
                  <div
                    style={{
                      color: 'white',
                      width: '40px',
                      lineHeight: '40px',
                      textAlign: 'center',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: `${user.get('avatar')}`
                    }}
                  >
                  {user.get('name').charAt(0)}
                  </div>
                  <span>{user.get('name')}</span>
                </div>
              ))
            }   
          </div>   
        </div>
        <div className="group-exit">
          <button>退出群组</button>
        </div>
      </FloatPanel>
    );
  }
}
