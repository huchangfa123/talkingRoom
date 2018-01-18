import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assert/css/managerBody.css';
import ManagerHeader from './managerHeader';
import { Motion, spring } from 'react-motion';
import ManagerItem from './managerItem';
import { getRoomList } from '../action/UserAction';

@connect(
  state => ({
    itemList: state.user.itemList
  }),
  { getRoomList }
)
export default class ManagerBody extends Component {
  constructor(props) {
    super(props);
  }

  async componentWillUpdate(nextProps, nextState) {
    let result = await this.props.getRoomList();
    console.log('result', result);
  }

  render() {
    console.log('222', this.props.itemList);
    // let { sideBarType } = this.props;
    return (
      <div>
        <div className="managerBody">
          <ManagerHeader />
          <div className="managerContent">
            <ManagerItem name="123" time="12:30" content="dasasdasdasdasssssssssssssssssssssssssssssssssssssda" />
            <ManagerItem name="222" time="12:30" content="dasasdasdasdasssssssssssssssssssssssssssssssssssssda" />
          </div>
        </div>
      </div>
    );
  }
}
