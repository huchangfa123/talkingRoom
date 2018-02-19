import React, { Component } from 'react';
import './managerItem.css';

export default class ManagerItem extends Component {
  render() {
    return (
      <div className="managerItem">
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
