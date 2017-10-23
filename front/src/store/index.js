import { createStore, combineReducers, applyMiddleware } from 'redux';
import { messageList, loginSetting } from '../reducers';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';

const store = create();

export default store;

function create() {
  const reducer = combineReducers({
    messageList,
    loginSetting,
    routing: routerReducer
  });
  const store = createStore(reducer, applyMiddleware(thunk));
  return store;
}