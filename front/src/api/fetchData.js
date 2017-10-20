import axios from 'axios';
import config from '../config';

axios.defaults.baseURL = config.apiUrl;

export const getData = (url, param) => {
    return (
        axios.get(`${url}`)
    )
}

export const postData = (url, param) => {
    return (
        axios.post(`${url}`, param)
    )
}