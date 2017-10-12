import socket from '../frameworks/Socket';

export const SEND_MESSAGE = "send-message";
export const TEST_MESSAGE = "test-message";

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