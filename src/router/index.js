import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'login',
      component: resolve => require(['@/views/Login/login.vue'], resolve)
    }
  ]
})