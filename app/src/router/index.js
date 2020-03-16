import Vue from "vue";
import Router from "vue-router";
import Hjem from "../views/Hjem.vue";
import Grupper from "../views/Grupper.vue";
import Kalender from "@/views/Kalender";
import EventShow from "@/views/EventShow.vue";
import Register from  "@/components/Register";
import Login from "@/components/Login";

import store from "../store/store";

Vue.use(Router);

const routes = [
  {
    path: '*',
    name: '',
    beforeEnter (to, from, next) {
      if (store.state.token) {
        next('/');
      } else {
        next();
      }
    },
  },
  {
    path: "/",
    name: "hjem",
    component: Hjem
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/grupper",
    name: "grupper",
    component: Grupper
  },
  {
    path: "/kalender",
    name: "kalender",
    component: Kalender
  },
  {
    path: "/event/:id",
    name: "event-show",
    component: EventShow,
    props: true
  }
];
//mode:history fjerner #(hashtags) i lenken i det man bytter mellom forskjellige views i nettsiden
const router = new Router({
  routes,
  mode: "history"
});

const openRoutes = ['login', 'register'];
// Router - Navigation Guards
router.beforeResolve((to,from,next) => {
  if (openRoutes.includes(to.name)) {
    next();
  } else if (store.state.token) {
    next();
  } else {
    next('/login');
  }

});

router.beforeResolve((to, from, next) => {
  if(to.name === 'login' && store.state.token) next({name: 'hjem'});
  else next();
});

router.beforeResolve((to, from, next) => {
  if(to.name === 'register' && store.state.token) next({name: 'hjem'});
  else next();
});

export default router;
