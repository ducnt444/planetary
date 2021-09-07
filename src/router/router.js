import Vue from "vue";
import Router from "vue-router";
import store from "../store";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "Home" */ "../views/Home.vue"),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/planets",
    name: "PlanetsList",
    component: () =>
      import(/* webpackChunkName: "PlanetsList" */ "../views/PlanetsList.vue"),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/planet-details/:slug",
    name: "PlanetDetails",
    component: () =>
      import(
        /* webpackChunkName: "PlanetDetails" */ "../views/PlanetDetails.vue"
      ),
    props: true,
    children: [
      {
        path: ":attractionSlug",
        name: "Attraction",
        component: () =>
          import(
            /* webpackChunkName: "Attraction" */ "../views/Attraction.vue"
          ),
        props: true,
        meta: { requiresAuth: true },
      },
    ],
    beforeEnter: (to, from, next) => {
      /* console.log(store.planets);
      console.log(to.params.slug); */
      const exists = store.planets.find(
        planet => planet.slug === to.params.slug
      )
      exists ? next() : next({name: "NotFound"})
    },
    meta: { requiresAuth: true },
  },

  {
    path: "/feed",
    name: "Feed",
    component: () => import(/* webpackChunkName: "Feed" */ "../views/Feed.vue"),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/user",
    name: "User",
    component: () => import(/* webpackChunkName: "User" */ "../views/User.vue"),
    props: true,
    meta: { requiresAuth: true }, //phải là object
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(
        /* webpackChunkName: "LoginPage" */
        "../views/LoginPage.vue"
      ),
    props: true,
  },
  {
    path: "/404",
    alias: "*",
    name: "NotFound",
    component: () =>
      import(
        /* webpackChunkName: "NotFound" */
        "../views/NotFound.vue"
      ),
  },
];

const router = new Router({
  linkExactActiveClass: "active-page",
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.user !== "abc") {
      next({
        name: "Login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
