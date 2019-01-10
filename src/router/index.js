import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main/main.vue'
import cookie from 'js-cookie'

Vue.use(VueRouter)

const router =  new VueRouter({
  routes: [ // 注：此处的方法名，记住这里是routes,不是routers，没有r，要是写成routers，控制台不会报错，就是渲染不出组件来，牢记啊！不然会让人崩溃的
    {
     path: '/',
     redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/Login/login.vue'], resolve) // 注：此处容易跟着代码提示一不小心写成components
    },
    {
      path: '/home',
      component: Main,
      children: [
        {
          path: '',
          name: 'home',
          component: resolve => require(['@/views/Home/home.vue'], resolve)
        }
      ]
    },
    {
      path: '/about',
      component: Main,
      children: [
        {
          path: '',
          name:  'us',
          component: resolve => require(['@/views/AboutUs/about-us.vue'], resolve)
        }
      ]
    },
    {
      path: '/news',
      component: Main,
      children: [
        {
          path: '',
          name:  'new',
          component: resolve => require(['@/views/News/news.vue'], resolve)
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  let token = cookie.get('token')
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