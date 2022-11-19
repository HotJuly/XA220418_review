import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  console.log(1)
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    // 如果用户已经登陆过了,有token数据,还想跳转login,
    // 结果:不让他去,带他去首页
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name

      // 如果用户没有用户信息,能到这里,说明用户已经请求了login结果,但是没有请求info结果
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          // 在获取用户信息的时候,会将用户能够访问的异步路由数据注入路由器中
          await store.dispatch('user/getInfo')

          // next()
          // console.log(123,router.resolve({path:to.fullPath}))
          if(router.resolve({path:to.fullPath}).resolved.fullPath === to.fullPath){
            
            // 放行,BUG:无法跳转刚刚注册路由地址
            // next()

            // 如果next中传入参数,那么当前会跳转两次,第一次跳转是无法到达刚刚注册的异步路由的
            // 所以强行跳转第二次,在第二次的时候,就可以跳转到想去的异步路由
            next({...to})
          }else{
            next({ path: '/' })
          }
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    // indexOf返回值是找到的元素的下标,如果没找到就是-1
    // 此处的意思就是说当前想要跳转的路由路径,如果在白名单中找到了,就直接跳转
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // 虽然人因为没有登录被引导到了login页面,但是还是通过query参数记录了用户想要去哪个路由
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
