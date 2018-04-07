import React, { Component } from 'react';
import { connect } from 'react-redux';
import './managerItem.css';
import ui from '../../action/UiAction';
import { getRoomMessage, setCurrentRoom } from '../../action/UserAction';
import socketServer from '../../frameworks/Socket';
import { formatManagerItemContent } from '../../util/format';
@connect(null, { getRoomMessage, setCurrentRoom })
export default class ManagerItem extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  async handleClick() {
    await this.props.setCurrentRoom(this.props.id)
    await this.props.getRoomMessage({id: this.props.id})
    await ui.getInRoom();
    this.context.router.history.push(`/main/chatting/${this.props.id}`);
    await socketServer()
  }

  render() {
    console.log('this.props.unread', this.props.content)
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
                backgroundColor: `${this.props.avatar}`
              }}
            >
              {this.props.name.charAt(0)}
            </div>
          )}
          <div className="unread" style={{display: this.props.unread === 0 ? 'none' : 'block'}}>{this.props.unread}</div>
        </div>
        <div className="itemContent">
          <div>
            <p>{this.props.name}</p>
            <p>{this.props.time}</p>
          </div>
          <div>
            <p>
              { formatManagerItemContent(this.props.content).toString() }
            </p>
          </div>
        </div>
      </div>
    );
  }
}
