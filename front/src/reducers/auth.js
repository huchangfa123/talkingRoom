import { USER_LOGIN, USER_REGISTER } from '../action/UserAction';

export function loginResult(loginResult = '', action) {
  if (action.type === USER_LOGIN) {
    loginResult = action.data;
  }
  sessionStorage.setItem('accessToken', loginResult.token);
  console.log('loginResult:', loginResult);
  return loginResult;
}

export function registerResult(registerResult = '', action) {
  if (action.type === USER_REGISTER) {
    registerResult = action.data;
  }
  return registerResult;
}