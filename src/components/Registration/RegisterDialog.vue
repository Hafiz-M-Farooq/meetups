<script>
export default {
  /* eslint-disable */
};
</script>
<template>
  <v-dialog persistent v-model="registerDialog" width="350px">
    <template v-slot:activator="{ on }">
      <v-btn
        accent
        v-on="on"
        color="success"
        class="mt-3 mb-5 mr-10"
      >{{userIsRegister ? "Unregister" : "Register"}}</v-btn>
    </template>
    <template>
      <v-card>
        <v-container>
          <v-layout row wrap class="mt-5">
            <h2 style="margin: 0 auto" v-if="userIsRegister">Unregister from Meetup?</h2>
            <h2 style="margin: 0 auto" v-else>Register for Meetup?</h2>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row wrap class="mt-5 mb-5">
            <v-flex xs12>
              <v-card-text>You can always change your decision later on.</v-card-text>
            </v-flex>
          </v-layout>
          <v-layout row wrap class="mt-5 mb-5">
            <v-flex xs12>
              <v-card-actions>
                <v-btn color="red" text @click="registerDialog = false">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="green" text @click="onAgree">Confirm</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  props: ["meetupId"],
  data() {
    return {
      registerDialog: false
    };
  },
  computed: {
    userIsRegister() {
      return (
        this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
          return meetupId === this.meetupId;
        }) >= 0
      );
    }
  },
  methods: {
    onAgree() {
      if (this.userIsRegister) {
        this.$store.dispatch("unregisterUserForMeetup", this.meetupId);
      } else {
        this.$store.dispatch("registerUserForMeetup", this.meetupId);
      }
    }
  }
};
</script>