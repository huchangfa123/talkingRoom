import React, { Component } from 'react';
import { connect } from 'react-redux';
import FloatPanel from '../floatPanel';
import ui from '../../action/UiAction';

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
          <div className="content"></div>
          <div className="userlist"></div>
        </div>
        <div className="group-exit"></div>
      </FloatPanel>
    );
  }
}
