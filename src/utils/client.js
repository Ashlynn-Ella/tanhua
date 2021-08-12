import axios from "axios";
import { BASE_URI } from './path-map'
import Toast from './Toast'
import { useAuth } from "../context/user-context";
import { useNavigation } from "@react-navigation/core";
import { useCallback } from "react";


const instance = axios.create({
  baseURL: BASE_URI
});
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  Toast.showLoading('请求中....')
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  Toast.hideLoading()
  return response;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

export const useClinet = () => {
  const { token } = useAuth()
  const navigation = useNavigation()
  const run = useCallback(async (url, data = {}, options = {}) => {
    const headers = options.headers || {}
    return new Promise(reslove => {
      instance.post(url, data, {
        ...options,
        headers: {
          "Authorization": `Bearer ${token}`,
          ...headers
        }
      }).then(res => {
        if (res.status === 401) {
          navigation.navigate('Login')
        } else {
          reslove(res.data)
        }
      })
    })
  },[token])
  const get = useCallback(async (url, data = {}, options = {}) => {
    const headers = options.headers || {}
    return new Promise(reslove => {
      instance.get(url, {
        ...options,
        params: data,
        headers: {
          "Authorization": `Bearer ${token}`,
          ...headers
        }
      }).then(res => {
        if (res.status === 401) {
          navigation.navigate('Login')
        } else {
          reslove(res.data)
        }
      })
    })
  },[token])
  return { run, get }
}