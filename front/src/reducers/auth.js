import { USER_LOGIN, USER_REGISTER } from '../action/UserAction';
import config from '../config';

export function loginResult(loginResult = '', action) {
  if (action.type === USER_LOGIN) {
    loginResult = action.data;
  }
  sessionStorage.setItem('accessToken', loginResult.token);
  console.log('loginResult:', loginResult);
  config.options.headers.Authorization = `${sessionStorage.getItem('accessToken')}`;
  return loginResult;
}

export function registerResult(registerResult = '', action) {
  if (action.type === USER_REGISTER) {
    registerResult = action.data;
  }
  return registerResult;
}