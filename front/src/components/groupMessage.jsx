import React, { Component } from 'react';
import { connect } from 'react-redux';
import FloatPanel from './floatPanel';
import ui from '../action/UiAction';

@connect(state => ({
  show: state.ui.showGroupMessage
}))
export default class GroupMessage extends Component {
  render() {
    const { show } = this.props;
    return (
      <FloatPanel title="群信息" show={show} onClose={ui.closeGroupMessage}>
        <div>lalla</div>
      </FloatPanel>
    );
  }
}
