import socketServer from '../frameworks/Socket';
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
  return async (dispatch) => {
    try {
      const result = await postData('/user/login', data);
      dispatch({
        type: USER_LOGIN,
        data: result.data
      });
      console.log('sss', result.data);
      return result.data;
    } catch (error) {
      console.log(error) 
    }
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
      console.log(error);
    }
  }
}


/**
 * 主动发送信息
 */
export function send(data) {
  return async (dispatch) => {
    let socket = await socketServer();
    socket.emit('send.message', data);
    dispatch({
      type: SEND_MESSAGE,
      data
    });
  }
}

/**
 * 新用户加入
 */
export function addUser(data) {
  return {
    type: ADD_USER,
    data
  }
}

/**
 * 用户离开
 */
export function userLeave(data) {
  return {
    type: USER_LEAVE,
    data
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