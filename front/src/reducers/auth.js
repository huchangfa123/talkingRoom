import config from '../config';
import cookie from 'js-cookie';
import { setToken } from '../config';
import { resetToken } from '../api/fetchData'

export function loginResult(loginResult = false, action) {
  if (action.type === 'userLogin') {
    if (action.data.code === 200) {
      const token = cookie.get('XSRF_TOKEN');
      console.log('asdasda', token)
      setToken(token)
      resetToken(token)
      loginResult = action.data.data.userData;
    }
  }
  return loginResult;
}

export function registerResult(registerResult = '', action) {
  if (action.type === 'userRegister') {
    registerResult = action.data;
  }
  return registerResult;
}
