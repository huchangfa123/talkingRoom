import React, { Component } from 'react';
import { connect } from 'react-redux';
import { spring, Motion } from 'react-motion';
import '../assert/css/iconMenu.css';
import ui from '../action/UiAction';

@connect(state => ({
  show: state.ui.showIconMenu || false
}))
export default class IconMenu extends Component {
  createGroup() {
    ui.createGroupSide();
  }

  joinGroup() {
    ui.joinGroupSide();
  }

  render() {
    const { show } = this.props;
    return (
      <Motion defaultStyle={{ opacity: 0 }} style={{ opacity: spring(show ? 1 : 0) }}>
        {({ scale, opacity }) => (
          <div
            className="iconMenu"
            style={{ opacity, transform: `scale(${scale})`, display: opacity === 0 ? 'none' : 'flex' }}
          >
            <div onClick={this.createGroup.bind(this)}>
              <span>创建群组</span>
            </div>
            <div onClick={this.joinGroup.bind(this)}>
              <span>加入群组</span>
            </div>
            <div>
              <span>关于作者</span>
            </div>
            <div>
              <span>登出</span>
            </div>
          </div>
        )}
      </Motion>
    );
  }
}
