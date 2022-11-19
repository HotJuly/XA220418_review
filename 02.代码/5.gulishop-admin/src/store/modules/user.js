import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter, asyncRoutes, anyRoutes, constantRoutes } from '@/router'
import {cloneDeep} from 'lodash'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',

    // 用于存储当前账号的路由权限信息,
    // 也就是服务器返回的routes数组,内部存储的都是用户能访问的路由别名
    routeNames:[],

    // 用于存储当前账号按钮级别权限信息
    buttons:[],

    // 用于解决左侧列表显示BUG
    // 用于存储当前账号能访问的所有路由
    routes:[],
  }
}

function mapButtons(buttons){
  /*
    当前的buttons是个数组,
      buttons=>['btn.Trademark.add','btn.Trademark.remove',...]
  
    将以上数据类型转换成一下数据类型;
      buttons=>{
        'btn.Trademark.add':true,
        'btn.Trademark.remove':true,
        ...
      }
  */

    const obj = {};
    buttons.forEach((item)=>{
      obj[item]=true;
    })
    return obj;

}

function filterAsyncRoutes(routeNames,asyncRoutes){
  /*
    需求:过滤出用户专属的异步路由数组
    参数:
      1.服务器传递的当前账号权限的数组routeNames
      2.当前项目所有的异步路由组成的数组
    返回值数据类型:routeObj[]
    返回值的含义:根据权限过滤得到的异步路由数组
  
  */
    const newAsyncRoutes = asyncRoutes.filter((routeObj)=>{
      const name = routeObj.name;
      const result = routeNames.includes(name);

      // if(routeObj.children&&routeObj.children.length){
      if(routeObj.children?.length){
        routeObj.children = filterAsyncRoutes(routeNames,routeObj.children);
      }

      return result;
    })

    return newAsyncRoutes;
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_PERMISSION: (state, data) => {
    const {routes,buttons} = data;
    state.routeNames = routes;

    // 当用户切换账号之后,必须使用完整的异步路由数组去实现过滤功能
    // 如果不做深拷贝,那么下次用户登录,过滤的异步路由数组,是上一个用户剩下的
    // 可能会出现异步路由不完整的情况
    const newAsyncRoutes = filterAsyncRoutes(routes,cloneDeep(asyncRoutes));
    // console.log('1',newAsyncRoutes)

    // 常量路由在初始化的时候,已经注册了,此处只是额外添加一些新的路由
    // 除非新的路由和旧的路由冲突了,那么以新的为准
    router.addRoutes([...newAsyncRoutes,...anyRoutes]);

    state.routes = [...constantRoutes,...newAsyncRoutes,...anyRoutes];

    // state.buttons = buttons;
    state.buttons = mapButtons(buttons);
  },
}

const actions = {
  // user login
  // login({ commit }, userInfo) {
  //   const { username, password } = userInfo
  //   return new Promise((resolve, reject) => {
  //     login({ username: username.trim(), password: password })
  //     .then(response => {
  //       const { data } = response
  //       commit('SET_TOKEN', data.token)
  //       setToken(data.token)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    try {
      const response = await login({ username: username.trim(), password: password });
      const { data } = response
      // 将请求回来的token存入Vuex的state中(相当于存储于内存中)
      commit('SET_TOKEN', data.token)
      // 将请求回来的token存入cookie中(相当于存储于硬盘中)
      // cookie相对localStorage的好处:每次发送请求会自动携带该token
      setToken(data.token)
    } catch (error) {
      console.log('error')
    }

  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_PERMISSION', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  // 开启命名空间,相当于是对所有的state,action,mutation进行模块化管理(类似作用域)
  //  dispatch('user/login')
  namespaced: true,
  state,
  mutations,
  actions
}

