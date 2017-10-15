import { createStore, combineReducers } from 'redux';
import { messageList, test1 } from '../reducers';

const store = create();

export default store;

function create() {
  const reducer = combineReducers({
    messageList,
    test1
  });
  const store = createStore(reducer);
  return store;
}
