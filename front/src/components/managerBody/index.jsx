import React, { Component } from 'react';
import { connect } from 'react-redux';
import './managerBody.css';
import ManagerHeader from '../managerHeader';
import { Motion, spring } from 'react-motion';
import ManagerItem from '../managerItem';
import { getRoomList } from '../../action/UserAction';
import { formatTime } from '../../util/format';

@connect(
  state => ({
    roomList: state.user.getIn(['roomList'])
  }),
  { getRoomList }
)
export default class ManagerBody extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="managerBody">
          <ManagerHeader />
          <div className="managerContent">
            {
              this.props.roomList.map((room, index) => (
                <ManagerItem 
                  key={index}
                  name={room.name} 
                  time={formatTime(room.updatedAt)}
                  id={room.id}
                  avatar={room.avatar}
                  content="21312312"
                />
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}
