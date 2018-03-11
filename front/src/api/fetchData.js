import axios from 'axios';
import config from '../config';


let token = config.options.headers.Authorization || '';

axios.defaults.baseURL = config.apiUrl;
axios.defaults.headers['authorization'] = token;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export function resetToken(newToken) {
  token = newToken;
  axios.defaults.headers['authorization'] = newToken;
  return
}

export const getData = (url, param, options = {}) => {
  return axios.get(`${url}`, options);
};

export const postData = (url, param, options = {}) => {
  return axios.post(`${url}`, param, options);
};
