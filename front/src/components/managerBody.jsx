import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assert/css/managerBody.css';
import ManagerHeader from './managerHeader';

export default class ManagerBody extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="managerBody">
        <ManagerHeader />
        <div className="managerItem" />
      </div>
    );
  }
}
