import axios from 'axios'
export function request(config){

const instance = axios.create({
baseURL:'http://152.136.185.210:8000/api/n3',
timeout:5000
})

// 2.axios的拦截器
instance.interceptors.request.use(config => {
// 拦截器作用：请求图标
return config
},err => {
  console.log(err);

})
// 响应拦截
instance.interceptors.response.use(res => {
  return res.data
},err => {
  console.log(err);
})

return instance(config)

}
