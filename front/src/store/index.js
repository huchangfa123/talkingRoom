import { createStore, combineReducers } from 'redux';
import { messageList, loginSetting } from '../reducers';
import { routerReducer } from 'react-router-redux';

const store = create();

export default store;

function create() {
  const reducer = combineReducers({
    messageList,
    loginSetting,
    routing: routerReducer
  });
  const store = createStore(reducer);
  return store;
}