import axios from 'axios';
import config from '../config';


let token = config.options.headers.XSRF_TOKEN || '';

axios.defaults.baseURL = config.apiUrl;
axios.defaults.headers['XSRF_TOKEN'] = token;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export function resetToken(newToken) {
  token = newToken;
  axios.defaults.headers['XSRF_TOKEN'] = newToken;
  return
}

export const getData = (url, param, options = {}) => {
  return axios.get(`${url}`, options);
};

export const postData = (url, param, options = {}) => {
  return axios.post(`${url}`, param, options);
};
