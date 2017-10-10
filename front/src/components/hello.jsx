import React, { Component } from 'react';
import '../assert/css/component.css'

export default class Hello extends Component {
  render() {
    return (
      <div className="wrapper">
         <div className="content">
          <ul id="chat_conatiner">
          </ul>
         </div>
         <div className="action">
          <textarea ></textarea>
          <div className="bottom">
            <button className="btn" id="clear">清屏</button>
            <button className="btn" id="send">发送</button>
          </div>
         </div>
      </div>
    )
  }
}