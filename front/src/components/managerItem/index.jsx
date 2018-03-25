import React, { Component } from 'react';
import { connect } from 'react-redux';
import './managerItem.css';
import ui from '../../action/UiAction';
import { getRoomMessage } from '../../action/UserAction';
import socketServer from '../../frameworks/Socket'
@connect(null, { getRoomMessage })
export default class ManagerItem extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  async handleClick() {
    await this.props.getRoomMessage({id: this.props.id})
    await ui.getInRoom();
    this.context.router.history.push(`/main/chatting/${this.props.id}`);
    await socketServer()
  }

  render() {
    return (
      <div className="managerItem" onClick={this.handleClick.bind(this)}>
        <div className="itemPic">
          {this.props.pic ? (
            <img src={this.props.pic} />
          ) : (
            <div
              style={{
                color: 'white',
                width: '40px',
                lineHeight: '40px',
                textAlign: 'center',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#153535'
              }}
            >
              {this.props.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="itemContent">
          <div>
            <p>{this.props.name}</p>
            <p>{this.props.time}</p>
          </div>
          <div>
            <p>{this.props.content}</p>
          </div>
        </div>
      </div>
    );
  }
}
