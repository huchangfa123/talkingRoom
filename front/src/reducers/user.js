import { SEND_MESSAGE, TEST_MESSAGE } from '../action/UserAction';

export function messageList(messageList = [], action) {
  const list = [...messageList]
  switch(action.type) {
    case TEST_MESSAGE:
      list.push(action.message);
      break;
  }
  return list;
}