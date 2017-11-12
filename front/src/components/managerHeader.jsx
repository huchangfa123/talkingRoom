import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assert/css/icon.css';
import '../assert/css/managerHeader.css';

export default class ManagerHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="managerHeader">
        <div className="searchBox">
          <div className="pic">
            <i className="iconfont headpic">&#xe738;</i>
          </div>
          <input type="text" />
        </div>
        <div className="toolBtn">
          <i className="iconfont chatpic">&#xe63b;</i>
        </div>
      </div>
    );
  }
}
