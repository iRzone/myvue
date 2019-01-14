
import Main from '@/views/Admin/Main/main.vue'

const admin_routes = [
  {
    path: '/admin_home',
    component: Main,
    children: [
      {
        path: '',
        name: 'admin_home',
        component: resolve => require(['@/views/Admin/Home/home.vue'], resolve)
      }
    ]
  },
  {
    path: '/member_manage',
    component: Main,
    children: [
      {
        path: '',
        name: 'member',
        component: resolve => require(['@/views/Admin/Member/member.vue'], resolve)
      }
    ]
  },
]

export default admin_routes