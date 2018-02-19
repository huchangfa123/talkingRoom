import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './setting.css';

export default class Setting extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="settingBody">
        <div className="">111</div>
        <div className="">222</div>
        <div className="">1131</div>      
      </div>
    )
  }
}