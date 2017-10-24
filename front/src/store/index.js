import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { messageList, registerResult, loginResult } from '../reducers';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';

const store = create();

export default store;

function create() {
  const reducer = combineReducers({
    messageList,
    registerResult,
    loginResult,
    routing: routerReducer
  });

  const args = [applyMiddleware(thunk), applyMiddleware(promise)]
  const store = createStore(reducer, compose(...args));
  return store;
}