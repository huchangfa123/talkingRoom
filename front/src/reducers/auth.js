import { USER_LOGIN, USER_REGISTER } from '../action/UserAction';

export function loginResult(loginResult = '', action) {
  if (action.type === USER_LOGIN) {
    return action.data;
  }
  return loginResult;
}

export function registerResult(registerResult = '', action) {
  if (action.type === USER_REGISTER) {
    registerResult = action.data;
  }
  return registerResult;
}