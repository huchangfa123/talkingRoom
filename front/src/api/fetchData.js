import axios from 'axios';
import config from '../config';

axios.defaults.baseURL = config.apiUrl;

export const getData = (url, param, options = {}) => {
    return (
        axios.get(`${url}`, options)
    )
}

export const postData = (url, param, options = {}) => {
    return (
        axios.post(`${url}`, param, options)
    )
}