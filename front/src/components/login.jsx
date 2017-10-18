import React, { Component } from 'react';
import { connect, dispatch } from 'react-redux';

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="login">
        <div>asd</div>
        <div>
          <span>asd</span>
          <div class="input-normal">
            <div>
              {/* <i></i> */}
              asd
            </div>
            <input type="text" placeholder="用户名" />
          </div>
        </div>
      </div>
    )
  }
}