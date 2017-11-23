import { USER_LOGIN, USER_REGISTER } from '../action/UserAction';
import config from '../config';

export function loginResult(loginResult = false, action) {
  if (action.type === USER_LOGIN && action.data.data.token) {
    if (action.data.code === 200) {
      sessionStorage.setItem('accessToken', action.data.data.token);
      config.options.headers.Authorization = `${sessionStorage.getItem('accessToken')}`;
      loginResult = action.data.data.userData;
    }
  }
  return loginResult;
}

export function registerResult(registerResult = '', action) {
  if (action.type === USER_REGISTER) {
    registerResult = action.data;
  }
  return registerResult;
}
