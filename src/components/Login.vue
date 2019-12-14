<template>
  <v-container class="mt-5">
    <v-layout row class="mb-5">
      <v-flex xs12 sm6 offset-sm3 v-if="error">
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onLogin">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      id="email"
                      label="Email"
                      v-model="email"
                      type="email"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      id="password"
                      label="Password"
                      v-model="password"
                      type="password"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit" :disabled="loading" :loading="loading">
                      Login
                      <span slot="loader" class="custom-loader">
                        <v-icon light>mdi-cached</v-icon>
                      </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
/* eslint-disable */
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters(["user", "error", "loading"])
    // user() {
    //   return this.$store.getters.user;
    // },
    // error() {
    //   return this.$store.getters.error;
    // },
    // loading() {
    //   return this.$store.getters.loading;
    // }
  },
  watch: {
    user(value) {
      if (value !== null || value !== undefined) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    onLogin() {
      // Vuex
      this.$store.dispatch("userLogin", {
        email: this.email,
        password: this.password
      });
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    }
  }
};
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>