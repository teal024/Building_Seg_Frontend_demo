import axios from 'axios'

const baseURL = 'http://127.0.0.1:8000';
// const baseURL = 'http://124.220.110.93:5045/api'

const request = axios.create({  // 创建axios实例
    baseURL: baseURL,
    timeout: 50000
})

export default request;