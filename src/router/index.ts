import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Desk",
    component: () =>
      import(/* webpackChunkName: "Desk" */ "@/views/desk/index.vue")
  },
  {
    path: "/404",
    name: "404",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/404.vue")
  },
  // {
  //   path: "/demo",
  //   name: "demo",
  //   component: () => import(/* webpackChunkName: "demo" */ "../views/demo.vue")
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.matched.length === 0) {
    from.name ? next({
      name: from.name
    }) : next('/404');
  } else {
    next();
    // if (to.name != 'login' && !store.state.userName && !store.state.userId) {

    // } else {
    // 	next(); //如果匹配到正确跳转
    // }
  }
});

export default router;
