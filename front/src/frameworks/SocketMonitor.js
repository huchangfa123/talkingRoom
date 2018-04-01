import { addUser, userLeave, otherLeaveRoom } from '../action/UserAction';
import { getNewMessage } from '../action/UserAction';
import store from '../store';

export default function socketMonitor (io) {
  // 新用户加入
  io.on('join', (data) => {
    store.dispatch(addUser(data));
  });

  // 用户离开
  io.on('user.leave', (data) => {
    console.log('user.leave', data)
    store.dispatch(userLeave(data));
  });

  io.on('send.message', (data) => {
    console.log('message.data',data)
    store.dispatch(getNewMessage(data));
  });

  io.on('user.leave.room', (data) => {
    console.log('我有过来', data)
    store.dispatch(otherLeaveRoom(data))
  })
}