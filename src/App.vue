<template>
  <v-app>
    <!-- Vue Toolbar Start -->
    <div>
      <v-navigation-drawer v-model="drawer" absolute left temporary>
        <v-list nav dense>
          <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
            <v-list-item v-for="item in menuItems" :key="item.title" :to="item.link">
              <v-icon left>{{item.icon}}</v-icon>
              <v-list-item-title>{{item.title}}</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="userIsAuthenticated" @click="onLogout">
              <v-icon left>mdi-exit-to-app</v-icon>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar :dark="true" color="indigo">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-sm-and-up"></v-app-bar-nav-icon>
        <router-link to="/" style="cursor: pointer">
          <img src="./assets/logo.png" />
        </router-link>
        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer">Meetups</router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-xs-only">
          <v-btn text :to="item.link" v-for="item in menuItems" :key="item.title">
            <v-icon left>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
          <v-btn text v-if="userIsAuthenticated" @click="onLogout">
            <v-icon left>mdi-exit-to-app</v-icon>Logout
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>
    <!-- Vue Toolbar End -->

    <!-- Vue Content Start -->
    <v-content>
      <router-view />
    </v-content>
    <!-- Vue Content End -->

    <!-- Vue Footer Start -->

    <v-footer :dark="true" padless>
      <v-card flat tile class="indigo white--text text-center" width="100%">
        <v-card-text>
          <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0"></v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          <span>&copy;</span>
          {{ new Date().getFullYear() }} —
          <strong>Developed by Hafiz Muhammad Farooq</strong>
        </v-card-text>
      </v-card>
    </v-footer>
    <!-- Vue Footer End -->
  </v-app>
</template>

<script>
export default {
  data() {
    //
    return {
      drawer: false,
      group: null,
      watch: {
        group() {
          this.drawer = false;
        }
      },
      icons: [
        "mdi-facebook",
        "mdi-twitter",
        "mdi-google-plus",
        "mdi-linkedin",
        "mdi-instagram"
      ]
    };
  },
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "mdi-face", title: "Sign up", link: "/signup" },
        { icon: "mdi-lock-open", title: "Sign in", link: "/login" }
      ];

      if (this.userIsAuthenticated) {
        menuItems = [
          {
            icon: "mdi-calendar-check",
            title: "View Meetups",
            link: "/meetups"
          },
          {
            icon: "mdi-map-marker",
            title: "Organize Meetup",
            link: "/meetup/new"
          }
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return this.$store.getters.user !== null;
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style scoped>
.v-btn:not(.v-btn--round).v-size--default {
  font-size: 13px;
}

@media only screen and (max-width: 768px) {
  .v-btn:not(.v-btn--round).v-size--default {
    font-size: 11px;
  }
}
</style>