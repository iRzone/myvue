import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [ // 注：此处的方法名，记住这里是routes,不是routers，没有r，要是写成routers，控制台不会报错，就是渲染不出组件来，牢记啊！不然会让人崩溃的
    {
      path: '/',
      name: 'login',
      component: resolve => require(['@/views/login.vue'], resolve) // 注：此处容易跟着代码提示一不小心写成components
    }
  ]
})

