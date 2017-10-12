import { createStore, combineReducers } from 'redux';
import { messageList } from '../reducers';

const store = create();

export default store;

function create() {
  const reducer = combineReducers({messageList});
  const store = createStore(reducer);
  return store;
}
