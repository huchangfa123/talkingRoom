import { addUser, userLeave } from '../action/UserAction';
import { getNewMessage } from '../action/UserAction';
import store from '../store';

export function socketMonitor (io) {
  // 新用户加入
  io.on('join', (data) => {
    store.dispatch(addUser(data));
  });

  // 用户离开
  io.on('disconnect', (data) => {
    store.dispatch(userLeave(data));
  });

  io.on('send.message', (data) => {
    store.dispatch(getNewMessage(data));
  });
}