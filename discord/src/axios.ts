import axios from 'axios'
import router from '@/routers'
/*
* 请求拦截器
*/
axios.interceptors.request.use((config) => {
  // 预处理请求信息
  console.log('RequestMessage:',config,sessionStorage.getItem('token'))
  return config
}, (error) => {
  // 预处理请求异常时抛出error
  return Promise.reject(error)
})

/*
* 响应拦截器
*/
axios.interceptors.response.use((res) => {
  // 进行响应事件处理
  const status = (res.status)
  switch (status) {
    case 200 :return res;
    default:return Promise.reject({ code: status, msg: res.data.data.message });
  }
}, (error) => {
  const status = (error.toString().substring(error.toString().length-3,error.toString().length))
  switch(status){
    case '404':
     console.error('request地址不存在~')
     //router.push({path:'/error',query:{status:404}})
    break;
    case '401':
     console.error('用户校验失败，请重新登录~')
     router.push('/login')
    break;
    case '500':
     console.error('服务器内部错误~')
     //router.push({path:'/error',query:{status:500}})
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
export default function (url:string, {
  // 默认求情方式post
  method = 'post',
  // 超时
  timeout = 2000,
  // 请求主题
  data = {},
  // 请求头
  headers = {
    /* 'Content-Type':"text/plain; charset=utf-8", */
    'authorization':sessionStorage.getItem('token'),
    'token':sessionStorage.getItem('token')
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
    withCredentials:true
  }
  return axios(config)
}
