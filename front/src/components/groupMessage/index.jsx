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
    console.log(123123123123, this.props.curSelectedRoom.get('onlineUsers').get(0).get('avatar'))
    this.props.curSelectedRoom.get('onlineUsers').findIndex(g => console.log('curname'))
    return (
      <FloatPanel title="群信息" show={show}>
        <div className="group-info">
          <div className="content"><span>在线人数:{this.props.curSelectedRoom.get('onlineUsers').length}</span></div>
          <div className="userlist">
          {/* {
            this.props.curSelectedRoom.get('onlineUsers').map((user, index) => (
              <div className="userItem">
                <div
                  key={{index}}
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
          } */}
              <div className="userItem">
                <div
                  style={{
                    color: 'white',
                    width: '40px',
                    minWidth: '40px',
                    minHeight: '40px',
                    lineHeight: '40px',
                    textAlign: 'center',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#233233'
                  }}
                >
                1
                </div>
                <span>222</span>
              </div>
              <div className="userItem">
                <div
                  style={{
                    color: 'white',
                    width: '40px',
                    lineHeight: '40px',
                    textAlign: 'center',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#233233'
                  }}
                >
                1
                </div>
                <span>222</span>
              </div> <div className="userItem">
                <div
                  style={{
                    color: 'white',
                    width: '40px',
                    lineHeight: '40px',
                    textAlign: 'center',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#233233'
                  }}
                >
                1
                </div>
                <span>222</span>
              </div> <div className="userItem">
                <div
                  style={{
                    color: 'white',
                    width: '40px',
                    lineHeight: '40px',
                    textAlign: 'center',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#233233'
                  }}
                >
                1
                </div>
                <span>222</span>
              </div> <div className="userItem">
                <div
                  style={{
                    color: 'white',
                    width: '40px',
                    lineHeight: '40px',
                    textAlign: 'center',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#233233'
                  }}
                >
                1
                </div>
                <span>222</span>
              </div> <div className="userItem">
                <div
                  style={{
                    color: 'white',
                    width: '40px',
                    lineHeight: '40px',
                    textAlign: 'center',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#233233'
                  }}
                >
                1
                </div>
                <span>222</span>
              </div> <div className="userItem">
                <div
                  style={{
                    color: 'white',
                    width: '40px',
                    lineHeight: '40px',
                    textAlign: 'center',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#233233'
                  }}
                >
                1
                </div>
                <span>222</span>
              </div> <div className="userItem">
                <div
                  style={{
                    color: 'white',
                    width: '40px',
                    lineHeight: '40px',
                    textAlign: 'center',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#233233'
                  }}
                >
                1
                </div>
                <span>222</span>
              </div> <div className="userItem">
                <div
                  style={{
                    color: 'white',
                    width: '40px',
                    lineHeight: '40px',
                    textAlign: 'center',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#233233'
                  }}
                >
                1
                </div>
                <span>222</span>
              </div> <div className="userItem">
                <div
                  style={{
                    color: 'white',
                    width: '40px',
                    lineHeight: '40px',
                    textAlign: 'center',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#233233'
                  }}
                >
                1
                </div>
                <span>222</span>
              </div> <div className="userItem">
                <div
                  style={{
                    color: 'white',
                    width: '40px',
                    lineHeight: '40px',
                    textAlign: 'center',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#233233'
                  }}
                >
                1
                </div>
                <span>222</span>
              </div> <div className="userItem">
                <div
                  style={{
                    color: 'white',
                    width: '40px',
                    lineHeight: '40px',
                    textAlign: 'center',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#233233'
                  }}
                >
                1
                </div>
                <span>222</span>
              </div> <div className="userItem">
                <div
                  style={{
                    color: 'white',
                    width: '40px',
                    lineHeight: '40px',
                    textAlign: 'center',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#233233'
                  }}
                >
                1
                </div>
                <span>222</span>
              </div> <div className="userItem">
                <div
                  style={{
                    color: 'white',
                    width: '40px',
                    lineHeight: '40px',
                    textAlign: 'center',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#233233'
                  }}
                >
                1
                </div>
                <span>222</span>
              </div> <div className="userItem">
                <div
                  style={{
                    color: 'white',
                    width: '40px',
                    lineHeight: '40px',
                    textAlign: 'center',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#233233'
                  }}
                >
                1
                </div>
                <span>222</span>
              </div> <div className="userItem">
                <div
                  style={{
                    color: 'white',
                    width: '40px',
                    lineHeight: '40px',
                    textAlign: 'center',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#233233'
                  }}
                >
                1
                </div>
                <span>222</span>
              </div>
          </div>
        </div>
        <div className="group-exit">
          <button>退出群组</button>
        </div>
      </FloatPanel>
    );
  }
}
