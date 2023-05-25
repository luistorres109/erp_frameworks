import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3003/api',
  headers: {
    'Content-type': 'application/json'
  }
});

export default axiosInstance;