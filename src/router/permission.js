import router from "./index"
import store from "@/store/index"


router.beforeEach((to, from, next) => {
  const user = store.state.user.profile;
  const admin = store.state.admin.profile;
  if (user.token) {
    if (to.path === '/login') {
      return next('/');
    }
  } else if (user.token === "" || user.token === undefined) {
    if (to.path.startsWith('/user-info') || to.path.startsWith('/recommend')) {
      return next({
        path: '/login',
        query: { redirectUrl: to.fullPath }
      });
    }
  }

  if (admin.token) {
    if (to.path === '/login-admin') {
      return next('/admin');
    }
  } else if (admin.token === "" || admin.token === undefined) {
    if (to.path.startsWith('/admin')) {
      return next('/login-admin');
    }
  }

  next();
})