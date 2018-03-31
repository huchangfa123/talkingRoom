import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';
import './sideBar.css';
import '../../assert/css/icon.css';
import BarHeader from '../barHeader';
import { joinRoom, createRoom } from '../../action/UserAction';
import notification from '../notice';
import ui from '../../action/UiAction';

@connect(
  state => ({
    sideBarType: state.ui.getIn(['sideBarType']),
    userData: state.loginResult
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
    let result = await this.props.joinRoom({name: this.state.roomName, userData: this.props.userData});
    if (result.code !== 200) {
      notification.warning(result.message);
    } else {
      await ui.sideBarClose()      
      notification.success('加入成功!') 
    }
  }

  async creatRoomEnsure() {
    let result = await this.props.createRoom({name: this.state.roomName, avatar: null, userData: this.props.userData});
    console.log('result', result.code)
    if (result.code !== 200) {
      notification.warning(result.message);
    } else {
      await ui.sideBarClose()
      notification.success('创建成功!')
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
                <input className="content" onChange={this.handleRoomName.bind(this)} />
                <div className="checkBtn">
                  <span>10</span>
                  <i
                    className="iconfont chatpic ensure-btn"
                    onClick={type === 'joinGroup' ? this.joinRoomEnsure.bind(this) : this.creatRoomEnsure.bind(this)}
                  >
                    &#xe6d4;
                  </i>
                </div>
              </div>
            </div>
          </div>
        )}
      </Motion>
    );
  }
}
