import axios from 'axios';
import { Toast } from 'vant';

const handleResponse = ({ code, data, message }) => {
  // 成功 => 展示message / 返回data
  if (code === 200) {
    // 展示message
    if (message) return Toast.success(message);
    return data;
  }
  //  失败 => 展示message
  switch (code) {
    case 400:
      message = message || '请求参数错误';
      break;
    case 401:
      message = message || '未授权，请登录';
      break;
    case 403:
      message = message || '没有权限';
      break;
    case 500:
      message = '服务器错误';
      break;
  }

  Toast.fail(message);
};

/** axios 二次封装（函数）*/
export const http = (config) => {
  // 创建axios实例
  const axiosIntance = axios.create({
    // 请求公共地址
    baseURL: 'http://localhost:3000',
    // 超时时间
    timeout: 5000,
  });

  // 配置拦截器 => 请求拦截
  axiosIntance.interceptors.request.use(
    (config) => {
      // loading
      // token
      return config;
    },
    (err) => console.log(err),
  );

  // 配置拦截器 => 响应拦截
  axiosIntance.interceptors.response.use(
    (response) => {
      return handleResponse(response.data);
    },
    (err) => {
      console.log(err);
    },
  );

  return axiosIntance(config);
};
