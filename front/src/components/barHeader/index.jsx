import React, { Component } from 'react';
import './barHeader.css';
import '../../assert/css/icon.css';
import ui from '../../action/UiAction';

/**
 * 左边悬浮框头部
 */
export default class BarHead extends Component {
  constructor(props) {
    super(props);
  }

  back() {
    ui.sideBarClose();
  }

  render() {
    const { title } = this.props;
    return (
      <div className="BarHeader">
        <i className="iconfont headpic" onClick={this.back.bind(this)}>
          &#xe683;
        </i>
        <span>{title}</span>
      </div>
    );
  }
}
