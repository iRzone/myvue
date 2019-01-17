import Vue from 'vue'
import VueRouter from 'vue-router'
// import UserMain from '@/views/User/Main/main.vue'
// import AdminMain from '@/views/Admin/Main/main.vue'
import cookie from 'js-cookie'
import admin_routes from './admin.js'
import user_routes from './user.js'

Vue.use(VueRouter)

const router =  new VueRouter({
  routes: [ // 注：此处的方法名，记住这里是routes,不是routers，没有r，要是写成routers，控制台不会报错，就是渲染不出组件来，牢记啊！不然会让人崩溃的
    {
      path: '/',
      redirect: () => {
        if (localStorage.getItem('UserMsg')) {
          return JSON.parse(localStorage.getItem('UserMsg')).Admin === 1? 'admin_home': 'user_home'
        } else {
          return '/login'
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/Login/login.vue'], resolve) // 注：此处容易跟着代码提示一不小心写成components
    },
    ...user_routes,
    ...admin_routes
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to)
  let token = cookie.get('token')
  // console.log(token)
  if (!token && to.name !== 'login') {
    next({
      replace: true,
      name: 'login'
    })
  } else if (!token && to.name === 'login') {
    next()
  } else if (token && to.name === 'login') {
    Vue.prototype.$Message.warning('你已登陆过无需再次登录！')
    next({
      replace: true,
      name: from.name
    })
  } else {
    next()
  }
})

export default router