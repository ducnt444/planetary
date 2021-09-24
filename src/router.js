import axios from "axios";
import Vue from "vue";
import Router from "vue-router";
// import localStore from "./localStore";
import store from "./store/store.js";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "Home" */ "./views/Home.vue"),
    props: true,
    meta: { requiresAuth: true },
    // beforeEnter: (to, from, next) => {
    //   if (sessionStorage.getItem("redirect") !== null) {
    //     const redirect = sessionStorage.redirect;
    //     delete sessionStorage.redirect;
    //     next(redirect);
    //   } else {
    //     next();
    //   }
    // },
  },
  {
    path: "/planets-list",
    name: "PlanetsList",
    component: () =>
      import(/* webpackChunkName: "PlanetsList" */ "./views/PlanetsList.vue"),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/planet-details/:slug",
    name: "PlanetDetails",
    component: () =>
      import(
        /* webpackChunkName: "PlanetDetails" */ "./views/PlanetDetails.vue"
      ),
    meta: { requiresAuth: true },
    props: true,
    children: [
      {
        path: ":attractionSlug",
        name: "Attraction",
        component: () =>
          import(/* webpackChunkName: "Attraction" */ "./views/Attraction.vue"),
        props: true,
        meta: { requiresAuth: true },
      },
    ],
    beforeEnter: (to, from, next) => {
      const exists = store.state.planets.find(
        (planet) => planet.slug === to.params.slug
      );
      console.log(exists);
      exists ? next() : next({ name: "NotFound" });
    },
  },
  {
    path: "/legacy",
    name: "Legacy",
    component: () =>
      import(/* webpackChunkName: "Legacy" */ "./views/PlanetsListLegacy.vue"),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/feed",
    name: "Feed",
    component: () => import(/* webpackChunkName: "Feed" */ "./views/Feed.vue"),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/user",
    name: "User",
    component: () => import(/* webpackChunkName: "User" */ "./views/User.vue"),
    props: true,
    meta: { requiresAuth: true }, //phải là object
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(
        /* webpackChunkName: "LoginPage" */
        "./views/LoginPage.vue"
      ),
    props: true,
    beforeEnter: (to, from, next) => {
      store.getters.isLoggedIn ? next({ name: "Home" }) : next();
    },
  },
  {
    path: "/play",
    name: "Playground",
    component: () =>
      import(
        /* webpackChunkName: "Playground" */
        "./views/Playground.vue"
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
        "./views/NotFound.vue"
      ),
  },
];

const router = new Router({
  linkExactActiveClass: "active-page",
  // mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    axios
      .get("https://test-heroku444.herokuapp.com/currentUser")
      .then((res) => {
        if (!res.data.username) {
          next({
            name: "Login",
            // query: { redirect: to.fullPath },
          });
        } else {
          next();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // const isLoggedIn = localStorage.getItem("PlanetaryUsername");
    // if (isLoggedIn === "") {
    //   next({
    //     name: "Login",
    //     // query: { redirect: to.fullPath },
    //   });
    // } else {
    //   next();
    // }
  } else {
    next();
  }
});

export default router;
