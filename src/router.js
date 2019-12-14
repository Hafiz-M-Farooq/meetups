import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Meetups from "./views/Meetups.vue";
import CreateMeetup from "./views/CreateMeetup.vue";
import Login from "./views/Login.vue";
import Signup from "./views/Signup.vue";
import Meetup from "./views/Meetup.vue";
import AuthGuard from "./AuthGaurd";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter: AuthGuard
    },
    {
      path: "/meetups",
      name: "Meetups",
      component: Meetups,
      beforeEnter: AuthGuard
    },
    {
      path: "/meetup/new",
      name: CreateMeetup,
      component: CreateMeetup,
      beforeEnter: AuthGuard
    },
    {
      path: "/meetup/:id",
      name: "Meetup",
      props: true,
      component: Meetup
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup
    }
  ]
});
