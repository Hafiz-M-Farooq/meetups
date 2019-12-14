import Vue from "vue";
import Vuex from "vuex";

import meetup from "./Store/Meetups/index";
import user from "./Store/Users/index";
import shared from "./Store/Shared/index";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    meetup: meetup,
    user: user,
    shared: shared
  }
});
