import socket from '../frameworks/Socket';

export const SEND_MESSAGE = "send-message";
export const TEST_MESSAGE = "test-message";
export const ADD_USER = "add-user";
export const USER_LEAVE = " user-leave";

export function send(message) {
  socket.emit('send.message', message);
  return {
    type: SEND_MESSAGE,
    message
  }
}

export function test(message) {
  return {
    type: TEST_MESSAGE,
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