import { SEND_MESSAGE, GET_MESSAGE, ADD_USER, USER_LEAVE } from '../action/UserAction';

export function messageList(messageList = [], action) {
  const list = [...messageList]
  switch(action.type) {
    case SEND_MESSAGE:
      list.push(action.message);
      break;
    case GET_MESSAGE:
      list.push(action.data);
      break;
    case ADD_USER:
      list.push('a user is joining');
      break;
    case USER_LEAVE:
      list.push('a user is leaving');
      break;
  }
  return list;
}
