import { addUser, userLeave } from '../action/UserAction';
import { getNewMessage } from '../action/UserAction';
import store from '../store';

export default function socketMonitor (io) {
  // 新用户加入
  io.on('join', (data) => {
    console.log('i have listen1:', data)
    store.dispatch(addUser(data));
  });

  // 用户离开
  io.on('user.leave', (data) => {
    console.log('i have listen2:', data)
    store.dispatch(userLeave(data));
  });

  io.on('send.message', (data) => {
    console.log('i have listen3:', data)    
    store.dispatch(getNewMessage(data));
  });
}