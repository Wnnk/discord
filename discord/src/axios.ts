import axios from 'axios'
import router from '@/routers'



export default function (url:string, {
  // 默认求情方式post
  method = 'post',
  // 超时
  timeout = 2000,
  // 请求主题
  data = {},
  // 请求头
  headers = {
    'Content-Type':'application/json',
    'authorization':localStorage.getItem('token'),
    'token':localStorage.getItem('token'),
    },
  // 文件类型
  dataType = 'json'
}) {
  const config = {
    method: method,
    timeout: timeout,
    url: url,
    baseURL: 'http://127.0.0.1:7001',
    data: data,
    headers: headers,
    dataType: dataType,
    withCredentials:true,
  }
  return axios(config)
}


/* token解析 */
const getTokenExpire = (token:string) => {
  const base64Url = token.split('.')[1]; // 获取payload部分
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // 将base64Url编码转换为普通base64编码
  const payload = JSON.parse(atob(base64)); // 解码base64数据并解析为JSON
  if (payload.exp) {
    return payload.exp
  } else {
    return null
  }
}



/*
* 请求拦截器
*/
axios.interceptors.request.use(async (config) => {
  // refreToken(config);
  return config
}, (error) => {
 
  return Promise.reject(error)
})



/*
* 响应拦截器
*/

/* 是否刷新token */
let isRefreshing = false;
/* 刷新期间被挂起的请求数组 */
let refreshSubscribers:any = [];

const refreshToken = async () => {
  const res = await axios({
    method: 'post',
    url: 'http://127.0.0.1:7001/refretoken',
    data:{
      refreshToken:localStorage.getItem('refreshToken'),
    },
  });
  const newtoken  = res.data.data.newtoken;
  localStorage.setItem('token',newtoken);
  // axios.defaults.headers.common['Authorization'] = newtoken;
  // axios.defaults.headers.token = newtoken;
  return res
}
axios.interceptors.response.use((res:any) => {
 
  const status = (res.status)
  switch (status) {
    case 200 : return res;
    // default:return Promise.reject({ code: status, msg: res.data.data.message });
  }
}, async (error) => {
  const status = (error.toString().substring(error.toString().length-3,error.toString().length))
  switch(status){
    case '404':
     console.error('request地址不存在~')
    break;
    case '401':
     const originalRequest = error.config;
     const { data , config } = error.response;
    //  if ( !originalRequest._retry) {
    //   originalRequest._retry = true;
    //   return axios({
    //     url:'http://127.0.0.1:7001/refretoken',
    //     method:'post',
    //     data:{
    //       refreshToken:localStorage.getItem('refreshToken'),
    //     }
    //   }).then((res) => {
    //     const newtoken  = res.data.data.newtoken;
    //     localStorage.setItem('token',newtoken);
    //     axios.defaults.headers.common['Authorization'] = newtoken;
    //     axios.defaults.headers.token = newtoken;
    //     originalRequest.headers.Authorization = newtoken;
    //     originalRequest.headers.token = newtoken;
    //     return axios(originalRequest);
    //   })
    //  }
    if (isRefreshing) {
      return new Promise((resolve) => {
        refreshSubscribers.push({
          config,
          resolve
        });
      });
    }
    isRefreshing = true;
    const res = await refreshToken()
    if (res.status === 200) {
      refreshSubscribers.forEach(({config, resolve}) => {
        config.headers.token = res.data.data.newtoken;
        config.headers.authorization = res.data.data.newtoken;
        resolve(axios(config));
      })
      refreshSubscribers = []
    }
    config.headers.token = res.data.data.newtoken;
    config.headers.authorization = res.data.data.newtoken;
    isRefreshing = false;
    return axios(config)
    break;
    case '403':
     console.error('用户校验失败，请重新登录~')
     router.push('/login')
    break;
    case '500':
     console.error('服务器内部错误~')
    break;
  }
  return Promise.reject(error)
})

/**
 * 返回axios方法
 * @param url（如果传绝对地址则baseURL不会追加到url之前）
 * @param method
 * @param timeout
 * @param data
 * @param headers
 * @param dataType
 * @returns {AxiosPromise}
 */


// export default function (url:string, {
//   // 默认求情方式post
//   method = 'post',
//   // 超时
//   timeout = 2000,
//   // 请求主题
//   data = {},
//   // 请求头
//   headers = {
//     'Content-Type':'application/json',
//     'authorization':localStorage.getItem('token'),
//     'token':localStorage.getItem('token'),
//     },
//   // 文件类型
//   dataType = 'json'
// }) {
//   const config = {
//     method: method,
//     timeout: timeout,
//     url: url,
//     baseURL: 'http://127.0.0.1:7001',
//     data: data,
//     headers: headers,
//     dataType: dataType,
//     withCredentials:true,
//   }
//   return axios(config)
// }
