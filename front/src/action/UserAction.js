import socket from '../frameworks/Socket';
import axios from 'axios';
import config from '../config'
import {
  postData
} from '../api/fetchData';

export const SEND_MESSAGE = "send-message";
export const ADD_USER = "add-user";
export const USER_LEAVE = " user-leave";
export const GET_MESSAGE = "get-message";
export const USER_LOGIN = "user-login";
export const USER_REGISTER = "user-register";

/**
 * 用户登录
 */
export function login(data) {
  return {
    type: USER_LOGIN,
    data
  }
}

/**
 * 用户注册
 */
export function register(data) {
  return async (dispatch) => {
    try {
      const result = await postData('/user/register', data);
      dispatch({
        type: USER_REGISTER,
        data: result.data
      });
      return result.data;
    } catch (error) {
      console.log(err);
    }
  }
}


/**
 * 主动发送信息
 */
export function send(message) {
  socket.emit('send.message', message);
  return {
    type: SEND_MESSAGE,
    message
  }
}

/**
 * 新用户加入
 */
export function addUser(user) {
  return {
    type: ADD_USER,
    user
  }
}

/**
 * 用户离开
 */
export function userLeave(user) {
  return {
    type: USER_LEAVE,
    user
  }
}

/**
 * 获取新消息
 */
export function getNewMessage(data) {
  return {
    type: GET_MESSAGE,
    data
  }
}