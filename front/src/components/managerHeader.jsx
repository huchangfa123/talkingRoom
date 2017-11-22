import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assert/css/icon.css';
import '../assert/css/managerHeader.css';
import IconMenu from './iconMenu';
import actions from '../action/UiAction';

@connect(null, { openIconMenu: actions.openIconMenu })
export default class ManagerHeader extends Component {
  constructor(props) {
    super(props);
  }

  toolClick() {
    this.props.openIconMenu();
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
          <i className="iconfont chatpic" style={{ cursor: 'pointer' }} onClick={this.toolClick.bind(this)}>
            &#xe63b;
          </i>
          <IconMenu />
        </div>
      </div>
    );
  }
}
