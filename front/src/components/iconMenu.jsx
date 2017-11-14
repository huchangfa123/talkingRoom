import React, { Component } from 'react';
import { connect } from 'react-redux';
import { spring, Motion } from 'react-motion';
import '../assert/css/iconMenu.css';

@connect(state => ({
  show: state.ui.showIconMenu || false
}))
export default class IconMenu extends Component {
  render() {
    const { show } = this.props;
    return (
      <Motion
        defaultStyle={{ scale: 0, opacity: 0 }}
        style={{ scale: spring(show ? 1 : 0), opacity: spring(show ? 1 : 0) }}
      >
        {({ scale, opacity }) => (
          <div
            className="iconMenu"
            style={{ opacity, transform: `scale(${scale})`, display: opacity === 0 ? 'none' : 'flex' }}
          >
            123
          </div>
        )}
      </Motion>
    );
  }
}
