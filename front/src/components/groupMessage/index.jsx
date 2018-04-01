import React, { Component } from 'react';
import { connect } from 'react-redux';
import FloatPanel from '../floatPanel';
import ui from '../../action/UiAction';
import { userLeaveRoom } from '../../action/UserAction'
import './groupMessage.css'

/**
 * 结合floatPanel的群信息右边弹框组件
 */
@connect(state => ({
  curSelectedRoom: state.user.getIn(['curSelectedRoom']),
  show: state.ui.getIn(['showGroupMessage']),
  loginResult: state.loginResult
}), { userLeaveRoom })
export default class GroupMessage extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  async handleLeaveRoom() {
    let roomId = this.props.curSelectedRoom.get('id')
    let userId = this.props.loginResult.id
    await this.props.userLeaveRoom({roomId, userId})
    ui.getOutRoom()
    this.context.router.history.push('/main/chatting');
  }
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
          <button onClick={this.handleLeaveRoom.bind(this)}>退出群组</button>
        </div>
      </FloatPanel>
    );
  }
}
