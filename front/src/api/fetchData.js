import axios from 'axios';
import config from '../config';

axios.defaults.baseURL = config.apiUrl;
axios.defaults.headers['xsrftoken'] = config.options.headers.XSRF_TOKEN || '';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export function resetToken(newToken) {
  axios.defaults.headers['xsrftoken'] = newToken;
  return
}

export const getData = (url, param, options = {}) => {
  return axios.get(`${url}`, options);
};

export const postData = (url, param, options = {}) => {
  return axios.post(`${url}`, param, options);
};
