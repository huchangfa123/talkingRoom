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
    dispatch({
      type: 'sendMessage',
      data
    });
  };
}

/**
 * 新用户加入
 */
export function addUser(data) {
  return {
    type: 'addUser',
    data
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
    dispatch({
      type: 'userRooms',
      data: result.data.rooms
    });
    return result;
  };
}

/**
 * 创建房间
 */
export function createRoom(data) {
  return async dispatch => {
    let result = await postData('/user/createRoom', data);
    dispatch({
      type: 'createRoom',
      data: result.data
    });
    return result.data;
  };
}

/**
 * 加入房间
 */
export function joinRoom(data) {
  return async dispatch => {
    let result = await postData('/user/joinRoom', data);
    dispatch({
      type: 'joinRoom',
      data: result
    });
    return result.data;
  };
}

export function choiceOtherRoom() {
  return dispatch => {
    dispatch({
      type: 'resetRoomData'
    })
  }
}
