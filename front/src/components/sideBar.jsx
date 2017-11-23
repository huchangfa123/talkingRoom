import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';
import '../assert/css/sideBar.css';
import '../assert/css/icon.css';
import BarHeader from './barHeader';
@connect(state => ({
  sideBarType: state.ui.sideBarType || null
}))
export default class SideBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { sideBarType: type } = this.props;
    let title = '';
    if (type === 'joinGroup') {
      title = '加入群组';
    } else if (type === 'createGroup') {
      title = '创建群组';
    }

    return (
      <Motion defaultStyle={{ left: -340 }} style={{ left: spring(type ? 0 : -340) }}>
        {style => (
          <div className="sideBar" style={style}>
            <BarHeader title={title} />
            <div className="sideBody">
              <div className="groupAvatar" />
              <div className="editBody">
                <div className="content" contentEditable />
                <div className="checkBtn">
                  <span>10</span>
                  <i className="iconfont chatpic">&#xe6d4;</i>
                </div>
              </div>
            </div>
          </div>
        )}
      </Motion>
    );
  }
}
