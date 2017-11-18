import React, { Component } from 'react';
import { Motion } from 'react-motion';

export default class JoinGroup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Motion>
        <div className="joinGroup">
          <div className="body">
            <span>123</span>
          </div>
        </div>
      </Motion>
    );
  }
}
