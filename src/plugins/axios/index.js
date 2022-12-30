import axios from "axios";

/** axios 二次封装（函数）*/
export const http = (config) => {
  // 创建axios实例
  const axiosIntance = axios.create({
    // 请求公共地址
    baseURL: "http://localhost:3000",
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
    (err) => console.log(err)
  );

  // 配置拦截器 => 响应拦截
  axiosIntance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );

  return axiosIntance(config);
};
