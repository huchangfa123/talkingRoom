import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import '../assert/css/sideBar.css';
import BarHeader from './barHeader';

export default class SideBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { type } = this.props;
    console.log('lalla', type);
    let title = '';
    if (type === 'joinGroup') {
      title = '加入群组';
    } else if (type === 'createGroup') {
      title = '创建群组';
    }
    return (
      <div className="sideBar">
        <BarHeader title={title} />
        <div className="sideBody">
          <span>123</span>
        </div>
      </div>
    );
  }
}
