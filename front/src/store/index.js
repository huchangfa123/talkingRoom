import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { user, registerResult, loginResult, ui } from '../reducers';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

const store = create();

export default store;

function create() {
  const reducer = combineReducers({
    user,
    registerResult,
    loginResult,
    ui,
    routing: routerReducer
  });

  const args = applyMiddleware(thunk, promise);
  const store = createStore(reducer, args);
  return store;
}
