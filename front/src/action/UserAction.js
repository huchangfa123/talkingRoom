import socketServer from '../frameworks/Socket';
import axios from 'axios';
import config from '../config';
import { postData, getData } from '../api/fetchData';

/**
 * 用户登录
 */
export function login(data) {
  return async dispatch => {
    try {
      const result = await postData('/user/login', data);
      dispatch({
        type: 'userLogin',
        data: result.data
      });
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };
}

export function autoLogin() {
  return async dispatch => {
    try {
      const result = await getData('/user/myInfo');
      dispatch({
        type: 'userLogin',
        data: result.data
      });
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };
}

export function logout() {
  return async dispatch => {
    const result = await getData('/user/logout');
    return result;
  }
}

/**
 * 用户注册
 */
export function register(data) {
  return async dispatch => {
    try {
      const result = await postData('/user/register', data);
      dispatch({
        type: 'userRegister',
        data: result.data
      });
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };
}

/**
 * 主动发送信息
 */
export function send(data) {
  return async dispatch => {
    let socket = await socketServer();
    socket.emit('send.message', data);
  };
}

/**
 * 新用户加入
 */
export function addUser(data) {
  return {
    type: 'addUser',
    data,
    roomId: data.roomId,
    user: data.user
  };
}

/**
 * 用户离开
 */
export function userLeave(data) {
  return {
    type: 'userLeave',
    data
  };
}

/**
 * 用户退出房间
 */
export function userLeaveRoom(data) {
  return async dispatch => {
    let result = await postData('/user/leaveRoom', {roomId: data.roomId})
    let socket = await socketServer();
    if (result) {
      socket.emit('user.leave.room', {roomId: data.roomId, userId: data.userId})
      dispatch({
        type: 'ownLeaveRoom',
        roomId: data.roomId,
        userId: data.userId
      })
    } else {
      return result;
    }
  }
}

export function otherLeaveRoom(data) {
  return {
    type: 'otherLeaveRoom',
    roomId: data.roomId,
    userId: data.userId
  }
}

/**
 * 获取新消息
 */
export function getNewMessage(data) {
  return {
    type: 'getMessage',
    data
  };
}

/**
 * 获取用户房间列表
 */
export function getRoomList(data) {
  return async dispatch => {
    let result = await getData('/user/myRooms');
    let socket = await socketServer();
    dispatch({
      type: 'setRoomsAndMessagesList',
      data: result.data.rooms
    });
    for(let room of result.data.rooms) {
      socket.emit('join', {roomId: room.id, user: data.userData})
    }
    return result;
  };
}

/**
 * 创建房间
 */
export function createRoom(data) {
  return async dispatch => {
    let result = await postData('/user/createRoom', data);
    if (result.data.code === 200) {
      dispatch({
        type: 'createRoom',
        data: result.data
      });
      let socket = await socketServer();
      socket.emit('join', {roomId: result.data.data.id, user: data.userData});
    }
    return result.data;
  };
}

/**
 * 加入房间
 */
export function joinRoom(data) {
  return async dispatch => {
    let result = await postData('/user/joinRoom', data);
    if (result.data.code === 200) {
      dispatch({
        type: 'joinRoom',
        data: result.data
      });
      let socket = await socketServer();
      socket.emit('join', {roomId: result.data.data.id, user: data.userData})
    }
    return result.data;
  };
}

/**
 * 获取房间信息
 */
export function getRoomMessage(data) {
  return async dispatch => {
    let result = await getData(`/message/${data.id}/０`);
    dispatch({
      type: 'getRoomMessage',
      data: result.data,
      roomId: data.id
    })
    return result.data
  }
}

/**
 * 获取房间历史信息
*/
export function getRoomHistoryMessage(data) {
  return async dispatch => {
    let result = await getData(`/message/${data.id}/${data.curFirst}`)
    dispatch({
      type: 'getHistoryMessage',
      data: result.data,
      roomId: data.id
    })
  }
}


export function choiceOtherRoom() {
  return dispatch => {
    dispatch({
      type: 'resetRoomData'
    })
  }
}

/**
 * 设置当前房前以及加入当前房间的socket服务
*/
export function setCurrentRoom(roomId) {
  return async dispatch => {
    dispatch({
      type: 'setCurRoom',
      data: roomId
    })
  }
}
