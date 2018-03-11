import React, { Component } from 'react';
import { connect } from 'react-redux';
import { spring, Motion } from 'react-motion';
import './iconMenu.css';
import ui from '../../action/UiAction';
import cookie from 'js-cookie';

/*
* 点击点点点出来的菜单栏
*/
@connect(state => ({
  show: state.ui.getIn(['showIconMenu'])
}))
export default class IconMenu extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  createGroup() {
    ui.createGroupSide();
  }

  joinGroup() {
    ui.joinGroupSide();
  }

  logout() {
    cookie.remove('accessToken', { path: '' })
    this.context.router.history.push('/login');
  }

  render() {
    const { show } = this.props;
    return (
      <Motion defaultStyle={{ opacity: 0 }} style={{ opacity: spring(show ? 1 : 0) }}>
        {({ scale, opacity }) => (
          <div
            className="iconMenu"
            style={{ opacity, transform: `scale(${scale})`, display: opacity === 0 ? 'none' : 'flex' }}
          >
            <div onClick={this.createGroup.bind(this)}>
              <span>创建群组</span>
            </div>
            <div onClick={this.joinGroup.bind(this)}>
              <span>加入群组</span>
            </div>
            <div>
              <span>关于作者</span>
            </div>
            <div onClick={this.logout.bind(this)}>
              <span>登出</span>
            </div>
          </div>
        )}
      </Motion>
    );
  }
}
