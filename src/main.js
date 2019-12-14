import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import store from "./store";
import router from "./router";
import dateFilter from "./filters/date";
import * as firebase from "firebase";
import AlertComponent from "./components/Shared/Alerts";
import EditMeetupDialog from "./components/EditMeetup/EditMeetupDialog";
import EditMeetupDateDialog from "./components/EditMeetup/EditMeetupDateTimeDialog";
import RegisterDialog from "./components/Registration/RegisterDialog";

Vue.config.productionTip = false;
Vue.filter("date", dateFilter);
Vue.component("app-alert", AlertComponent);
Vue.component("edit-dialog", EditMeetupDialog);
Vue.component("edit-date-time-dialog", EditMeetupDateDialog);
Vue.component("register-dialog", RegisterDialog);

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyD39IUXHcE15KChkEAeAZzVDvc77t8gh0M",
      authDomain: "mymeetups-256315.firebaseapp.com",
      databaseURL: "https://mymeetups-256315.firebaseio.com",
      projectId: "mymeetups-256315",
      storageBucket: "mymeetups-256315.appspot.com",
      messagingSenderId: "886423777381",
      appId: "1:886423777381:web:8e81105d6773604610168c",
      measurementId: "G-NGTTFD7WL2"
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoLogin", user);
        this.$store.dispatch("fetchUserData");
      }
    });
    this.$store.dispatch("loadMeetups");
  }
}).$mount("#app");
