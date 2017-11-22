import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';
import ui from '../action/UiAction';
import '../assert/css/floatPanel.css';

export default class FloatPanel extends Component {
  handleCloseClick() {
    this.props.onClose();
    ui.closeMaskLayout();
  }

  render() {
    const { show, title } = this.props;
    return (
      <Motion defaultStyle={{ right: -340 }} style={{ right: spring(show ? 0 : -340) }}>
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
