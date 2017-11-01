import { SEND_MESSAGE, GET_MESSAGE, ADD_USER, USER_LEAVE } from '../action/UserAction';

export function messageList(messageList = [], action) {
  const list = [...messageList]
  switch(action.type) {
    case SEND_MESSAGE:
      list.push({
        type: 'OWN_MESSAGE',
        data: action.data
      });
      break;
    case GET_MESSAGE:
      list.push({
        type: 'OTHERS_MESSAGE', 
        data: action.data
      });
      break;
    case ADD_USER:
      list.push({
        type: 'TIPS_MESSAGE',
        data: action.data
      });
      break;
    case USER_LEAVE:
      list.push({
        type: 'TIPS_MESSAGE',
        data: action.data
      });
      break;
  }
  return list;
}
