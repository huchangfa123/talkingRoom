import { SEND_MESSAGE, TEST_MESSAGE } from '../action/UserAction';

export function messageList(messageList = [], action) {
  const list = [...messageList]
  switch(action.type) {
    case TEST_MESSAGE:
      list.push(action.message);
      break;
  }
  console.log(2222222222, list);
  return list;
}

export function test1(result = {}, action) {
  switch(action.type) {
    case TEST_MESSAGE:
      result = action.message;
      break;
  }
  return result;
}