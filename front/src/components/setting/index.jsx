import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './setting.css';
import { connect } from 'react-redux';
import Ui from '../../action/UiAction'

@connect(state => ({
  desktopNotification: state.ui.getIn(['desktopNotification']),
  soundNotification: state.ui.getIn(['soundNotification'])
}),null)
export default class Setting extends Component {
  constructor(props) {
    super(props);
  }

  async handleDesktop() {
    if (this.props.desktopNotification) {
      console.log(1)
      await Ui.notOpenDesktopNotification();
    } else {
      console.log(2)
      await Ui.openDesktopNotification();
    }
  }

  async handleSound() {
    if (this.props.soundNotification) {
      await Ui.notOpenSoundNotification();
    } else {
      await Ui.openSoundNotification();
    }
  }

  render() {
    console.log('this.props.soundNotification', this.props.soundNotification)
    return (
      <div className="settingBody">
        <div className="switch">
          <span>启动桌面信息提示:</span>
          <div onClick={this.handleDesktop.bind(this)}>
            <div className={this.props.desktopNotification? 'on' : 'off'}></div>
          </div>
        </div>
        <div className="switch">
          <span>启动桌面声音提示:</span>
          <div onClick={this.handleSound.bind(this)}>
            <div className={this.props.soundNotification? 'on' : 'off'}></div>
          </div>
        </div>
      </div>
    )
  }
}