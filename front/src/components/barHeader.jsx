import React, { Component } from 'react';
import '../assert/css/barHeader.css';
import '../assert/css/icon.css';

export default class BarHead extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="BarHeader">
        <i className="iconfont headpic">&#xe683;</i>
        <span>{this.props.type}</span>
      </div>
    );
  }
}
