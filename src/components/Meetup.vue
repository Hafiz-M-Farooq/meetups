<template>
  <v-container>
    <v-layout row wrap class="mt-10" v-if="loading">
      <v-flex xs12 class="text-center">
        <v-progress-circular :size="70" :width="7" color="red" indeterminate></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h6 class="primary--text">{{meetup.title}}</h6>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <edit-dialog :meetup="meetup"></edit-dialog>
            </template>
          </v-card-title>
          <v-img height="400px" :src="meetup.imageURL"></v-img>
          <v-card-text>
            <h5 class="primary--text">
              {{meetup.date | date}} -
              <span>{{meetup.location}}</span>
            </h5>
            <edit-date-time-dialog :meetup="meetup" v-if="userIsCreator"></edit-date-time-dialog>
            <p>{{meetup.description}}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <register-dialog :meetupId="meetup.id" v-if="userIsAuthenticated && !userIsCreator"></register-dialog>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import { mapGetters } from "vuex";
export default {
  props: ["id"],
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false;
      }
      return this.$store.getters.user.id === this.meetup.creatorId;
    },
    ...mapGetters(["loading"])
    // loading() {
    //   return this.$store.getters.loading;
    // }
  }
};
</script>