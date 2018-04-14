import { addUser, userLeave, otherLeaveRoom } from '../action/UserAction';
import { getNewMessage } from '../action/UserAction';
import store from '../store';
import Ui from '../action/UiAction';

export default function socketMonitor (io) {
  // 新用户加入
  io.on('join', (data) => {
    store.dispatch(addUser(data));
  });

  // 用户离开
  io.on('user.leave', (data) => {
    store.dispatch(userLeave(data));
  });

  io.on('send.message', (data) => {
    store.dispatch(getNewMessage(data));
    store.dispatch(Ui.playSound())
  });

  io.on('user.leave.room', (data) => {
    store.dispatch(otherLeaveRoom(data))
  })
}