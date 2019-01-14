
import Main from '@/views/User/Main/main.vue'

const user_routes = [
  {
    path: '/user_home',
    component: Main,
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
    component: Main,
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
    component: Main,
    children: [
      {
        path: '',
        name:  'new',
        component: resolve => require(['@/views/User/News/news.vue'], resolve)
      }
    ]
  }
]

export default user_routes