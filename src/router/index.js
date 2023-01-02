import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('../views/home'),
    meta: {
      title: '首页',
    },
  },
  {
    name: 'category',
    path: '/category',
    component: () => import('../views/category'),
    meta: {
      title: '分类',
    },
  },
  {
    name: 'cart',
    path: '/cart',
    component: () => import('../views/cart'),
    meta: {
      title: '购物车',
    },
  },
  {
    name: 'profile',
    path: '/profile',
    component: () => import('../views/profile'),
    meta: {
      title: '我的',
    },
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('../views/register'),
    meta: {
      title: '注册',
      isHide: true, // 隐藏底部导航栏
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;

  next();
});

export default router;
