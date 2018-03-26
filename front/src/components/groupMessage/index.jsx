import React, { Component } from 'react';
import { connect } from 'react-redux';
import FloatPanel from '../floatPanel';
import ui from '../../action/UiAction';

/**
 * 结合floatPanel的群信息右边弹框组件
 */
@connect(state => ({
  show: state.ui.getIn(['showGroupMessage'])
}))
export default class GroupMessage extends Component {
  render() {
    const { show } = this.props;
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
