import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assert/css/managerBody.css';
import ManagerHeader from './managerHeader';
import { Motion, spring } from 'react-motion';

export default class ManagerBody extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { sideBarType } = this.props;
    return (
      <div>
        <div className="managerBody">
          <ManagerHeader />
          <div className="managerItem" />
        </div>
      </div>
    );
  }
}
