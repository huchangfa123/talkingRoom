import React, { Component } from 'react';
import { connect } from 'react-redux';
import './maskLayout.css';

@connect(state => ({
  show: state.ui.getIn(['showMaskLayout'])
}))
export default class MaskLayout extends Component {
  render() {
    const { show } = this.props;
    return <div className="maskLayout" style={{ display: show ? 'block' : 'none' }} />;
  }
}
