import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import ui from '../../action/UiAction';
import './floatPanel.css';

/**
 * 群信息类型悬浮框统一组件
*/

export default class FloatPanel extends Component {
  handleCloseClick() {
    this.props.onClose();
    ui.closeMaskLayout();
  }

  render() {
    const { show, title } = this.props;
    return (
      <Motion defaultStyle={{ right: -500 }} style={{ right: spring(show ? 0 : -500) }}>
        {style => (
          <div className="floatPanel" style={style}>
            <div className="floatHeader">
              <span>{title}</span>
              <i className="iconfont closepic" onClick={this.handleCloseClick.bind(this)}>
                &#xe627;
              </i>
            </div>
            <div className="floatBody">{this.props.children}</div>
          </div>
        )}
      </Motion>
    );
  }
}
