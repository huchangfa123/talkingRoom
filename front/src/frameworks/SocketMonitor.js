import { addUser, userLeave } from '../action/UserAction';
import { getNewMessage } from '../action/UserAction';
import store from '../store';

export function socketMonitor (io) {
  // 新用户加入
  io.on('user.join', (data) => {
    console.log('a user join')
    store.dispatch(addUser(data));
  });

  // 用户离开
  io.on('user.leave', (data) => {
    store.dispatch(userLeave(data));
  });

  io.on('send.message', (data) => {
    store.dispatch(getNewMessage(data));
  });
}