import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assert/css/maskLayout.css';

@connect(state => ({
  show: state.ui.showMaskLayout
}))
export default class MaskLayout extends Component {
  render() {
    const { show } = this.props;
    console.log('lalal', show);
    return <div className="maskLayout" style={{ display: show ? 'block' : 'none' }} />;
  }
}
