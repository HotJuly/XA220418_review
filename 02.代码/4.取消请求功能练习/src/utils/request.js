import axios from 'axios';
import store from '@/store';

const request = axios.create({
    baseURL:"/api",
    timeout:20000
})

const CancelToken = axios.CancelToken;

request.interceptors.request.use((config)=>{

    // console.log(config)
    // 为了获取到当前请求的路径,方便登记
    const url = config.url;

    // 创建一个标记放于该请求身上,方便未来取消请求
    config.cancelToken = new CancelToken((cb)=>{
        // 该回调函数会被同步执行
        // 第一个形参cb,存储的就是用于取消当前请求的方法
        // 也就是说该方法被调用了,那么当前请求就会取消

        // console.log(url,cb)
        store.commit('ADD_FN',{url,cb})
    });
    return config
})

request.interceptors.response.use((response)=>{
    // console.log(response)
    const url = response.config.url;

    store.commit('REMOVE_FN',url)
    return response.data;
})

export default request