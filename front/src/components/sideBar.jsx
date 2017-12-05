import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';
import '../assert/css/sideBar.css';
import '../assert/css/icon.css';
import BarHeader from './barHeader';
import { joinRoom, createRoom } from '../action/UserAction';
import notification from './notice';

@connect(
  state => ({
    sideBarType: state.ui.sideBarType || null
  }),
  { joinRoom, createRoom }
)
export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: ''
    };
  }

  handleRoomName(e) {
    let value = e.target.value;
    this.setState({
      roomName: value
    });
  }

  async joinRoomEnsure() {
    let result = await this.props.joinRoom(this.state.roomName);
    if (result.code !== 200) {
      notification.warning(result.message);
    }
  }

  async creatRoomEnsure() {
    let result = await this.props.createRoom(this.state.roomName);
    if (result.code !== 200) {
      notification.warning(result.message);
    }
  }

  render() {
    let { sideBarType: type } = this.props;
    let title = '';
    if (type === 'joinGroup') {
      title = '加入群组';
    } else if (type === 'createGroup') {
      title = '创建群组';
    }

    return (
      <Motion defaultStyle={{ left: -340 }} style={{ left: spring(type ? 0 : -340) }}>
        {style => (
          <div className="sideBar" style={style}>
            <BarHeader title={title} />
            <div className="sideBody">
              <div className="groupAvatar" />
              <div className="editBody">
                <div className="content" onChange={this.handleRoomName.bind(this)} contentEditable />
                <div className="checkBtn">
                  <span>10</span>
                  <i className="iconfont chatpic">&#xe6d4;</i>
                </div>
              </div>
            </div>
          </div>
        )}
      </Motion>
    );
  }
}
