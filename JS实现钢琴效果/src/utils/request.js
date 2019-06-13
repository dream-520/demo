
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
// 创建axios实例
axios.defaults.baseURL = 'http://192.168.15.115:8080/gs'
axios.defaults.timeout = 5000
axios.defaults.withCredentials = true
axios.defaults.headers = { 'Content-Type': 'application/json; charset=utf-8', 'token': getToken() }
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.defaults.headers['token'] = Vue.cookie.get('token')
    axios.get(url, {
      params: params
    })
      .then(response => {
        if (!(response.data && response.data.code === 0)) {
          Message({
            message: response.data.msg,
            type: 'error',
            showClose: true,
            dangerouslyUseHTMLString: true,
            duration: 3000
          })
        } else {
          resolve(response.data)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.defaults.headers['token'] = getToken()
    axios.post(url, data)
      .then(response => {
        if (!(response.data && response.data.code === 0)) {
          Message({
            message: response.data.msg,
            type: 'error',
            showClose: true,
            dangerouslyUseHTMLString: true,
            duration: 3000
          })
        } else {
          resolve(response.data)
        }
      }, err => {
        reject(err)
      })
  })
}

export function gets(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.defaults.headers['token'] = getToken()
    axios.get(url, {
      params: params
    })
      .catch(err => {
        reject(err)
      })
  })
}

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 10 * 1000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['COP_Authorization'] = 'Bearer ' + getToken()
  }
  return config
}, error => {
  // console.log(error)
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(response => {
  const res = response.data
  console.log('respone拦截器', res)
  if (res.code && res.code !== '00000' && res.code !== '1' && (res.status ? res.status.code !== 0 : res.code !== 0) && !(res instanceof Blob)) {
    Message({
      message: res.msg ? res.msg : res.info || res.desc || res.status.desc || res.message,
      type: 'error',
      duration: 5 * 1000
    })
    if (res.code === '0' && res.msg === 'session失效！') {
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    }
    return res
    // return Promise.reject(error)
  } else {
    return res
  }
}, error => {
  // console.log('err' + error) // for debug
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
}
)

export default service
