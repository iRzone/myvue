
import Main from '@/views/Admin/Main/main.vue'

const admin_routes = [
  {
    path: '/admin_home',
    component: Main,
    children: [
      {
        path: '',
        name: 'home',
        component: resolve => require(['@/views/Admin/Home/home.vue'], resolve)
      }
    ]
  }
]

export default admin_routes