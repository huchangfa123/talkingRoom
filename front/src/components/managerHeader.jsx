import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assert/css/icon.css';
import '../assert/css/managerHeader.css';
import { openIconMenu, closeIconMenu } from '../action/UiAction';
import IconMenu from './iconMenu';

@connect(null, { openIconMenu, closeIconMenu })
export default class ManagerHeader extends Component {
  constructor(props) {
    super(props);
  }

  toolClick() {
    this.props.openIconMenu();
    document.addEventListener('click', e => {
      this.props.closeIconMenu();
    });
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
          <i className="iconfont chatpic" onClick={this.toolClick.bind(this)}>
            &#xe63b;
          </i>
          <IconMenu />
        </div>
      </div>
    );
  }
}
