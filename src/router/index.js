import Vue from 'vue'
import VueRouter from 'vue-router'
import UserMain from '@/views/User/Main/main.vue'
import AdminMain from '@/views/Admin/Main/main.vue'
import cookie from 'js-cookie'

Vue.use(VueRouter)

const router =  new VueRouter({
  routes: [ // 注：此处的方法名，记住这里是routes,不是routers，没有r，要是写成routers，控制台不会报错，就是渲染不出组件来，牢记啊！不然会让人崩溃的
    {
     path: '/',
     redirect: JSON.parse(localStorage.getItem('UesrMsg')).Admin === 1? 'admin_home': 'user_home'
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/Login/login.vue'], resolve) // 注：此处容易跟着代码提示一不小心写成components
    },
    // user
    {
      path: '/user_home',
      component: UserMain,
      children: [
        {
          path: '',
          name: 'user_home',
          component: resolve => require(['@/views/User/Home/home.vue'], resolve)
        }
      ]
    },
    {
      path: '/about',
      component: UserMain,
      children: [
        {
          path: '',
          name:  'us',
          component: resolve => require(['@/views/User/AboutUs/about-us.vue'], resolve)
        }
      ]
    },
    {
      path: '/news',
      component: UserMain,
      children: [
        {
          path: '',
          name:  'new',
          component: resolve => require(['@/views/User/News/news.vue'], resolve)
        }
      ]
    },
    // admin
    {
      path: '/admin_home',
      component: AdminMain,
      children: [
        {
          path: '',
          name: 'admin_home',
          component: resolve => require(['@/views/Admin/Home/home.vue'], resolve)
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