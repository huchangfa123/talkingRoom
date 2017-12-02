import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assert/css/managerBody.css';
import ManagerHeader from './managerHeader';
import { Motion, spring } from 'react-motion';
import ManagerItem from './managerItem';
@connect(state => {
  itemList: state.itemList;
})
export default class ManagerBody extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { sideBarType } = this.props;
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
