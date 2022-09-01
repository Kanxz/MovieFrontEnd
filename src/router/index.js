import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/LayoutView.vue'
import Home from '@/views/home/HomeIndex.vue'
import CategoryIndex from '@/views/category/CategoryIndex.vue'
import DetailIndex from "@/views/detail/DetailIndex.vue"
import LoginIndex from "@/views/user/LoginIndex.vue"
import RegisterIndex from "@/views/user/RegisterIndex.vue"
import AdminLogin from "@/admin/login/AdminLogin.vue"
import AdminIndex from "@/admin/AdminIndex.vue"
import UserManage from "@/admin/user/UserManage.vue"
import UserEdit from "@/admin/user/UserEdit.vue"
import UserAdd from "@/admin/user/UserAdd.vue"
import MovieManage from "@/admin/movie/MovieManage.vue"
import MovieEdit from "@/admin/movie/MovieEdit.vue"
import MovieAdd from "@/admin/movie/MovieAdd.vue"
import SearchIndex from "@/views/search/SearchIndex.vue"
import UserInfo from "@/views/user/UserInfo.vue"
import InfoView from "@/views/user/components/InfoView.vue"
import UserInfoEdit from "@/views/user/components/UserEdit.vue"
import UserComment from "@/views/user/components/UserComment.vue"
import CommentManage from "@/admin/comment/CommentManage.vue"
import RecommendIndex from "@/views/recommend/RecommendIndex.vue"
import SystemManage from "@/admin/system/SystemManage.vue"

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: "/movie", component: CategoryIndex },
      { path: "/movie-detail/:id", component: DetailIndex },
      { path: "/movie/search", component: SearchIndex },
      {
        path: '/user-info',
        component: UserInfo,
        children: [
          { path: '/user-info', component: InfoView },
          { path: '/user-info/edit', component: UserInfoEdit },
          { path: '/user-info/comment', component: UserComment },
        ]
      },
      { path: '/recommend', component: RecommendIndex },
    ]
  },
  { path: '/login', component: LoginIndex },
  { path: '/register', component: RegisterIndex },
  { path: '/login-admin', component: AdminLogin },
  {
    path: '/admin',
    component: AdminIndex,
    children: [
      { path: '/admin', component: MovieManage },
      { path: '/admin/user', component: UserManage },
      { path: '/admin/user/edit', component: UserEdit },
      { path: '/admin/user/add', component: UserAdd },
      { path: '/admin/movie', component: MovieManage },
      { path: '/admin/movie/edit', component: MovieEdit },
      { path: '/admin/movie/add', component: MovieAdd },
      { path: '/admin/comment', component: CommentManage },
      { path: '/admin/system', component: SystemManage },
    ]
  }
]

// 创建路由实例
const router = createRouter({
  // 使用hash方式实现路由
  history: createWebHashHistory(),
  // 配置路由规则，写法和之前一样
  routes
})

router.afterEach(() => {
  window.scrollTo(0, 0);
})


export default router