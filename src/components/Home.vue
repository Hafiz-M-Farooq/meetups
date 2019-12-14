<template>
  <v-container>
    <v-layout row wrap class="mt-5">
      <v-flex xs12 sm6 class="text-sm-right text-center">
        <v-btn large router to="/meetups" class="primary leftbtn">Explore Meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-sm-left text-center">
        <v-btn large router to="/meetup/new" class="primary">Orgainze Meetups</v-btn>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-10">
      <v-flex xs12 class="text-center">
        <v-progress-circular :size="70" :width="7" color="green" indeterminate v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-5" v-if="!loading">
      <v-flex xs12>
        <v-carousel style="cursor: pointer">
          <v-carousel-item
            v-for="meetup in featuredMeetups"
            :key="meetup.id"
            :src="meetup.imageURL"
            @click="onLoadMeetup(meetup.id)"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <div class="meetuptitle text-center">{{meetup.title}}</div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-5">
      <v-flex xs12 class="text-center">
        <p>Join Our Awesome Meetups!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    onLoadMeetup(id) {
      this.$router.push("/meetup/" + id);
    }
  },
  computed: {
    ...mapGetters(["featuredMeetups", "loading"])
    // meetups() {
    //   return this.$store.getters.featuredMeetups;
    // },
    // loading() {
    //   return this.$store.getters.loading;
    // }
  }
};
</script>

<style scoped>
.meetuptitle {
  font-weight: 900;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 2rem;
  padding: 1rem;
}
@media only screen and (min-width: 600px) {
  .leftbtn {
    margin-right: 20px;
  }
}
@media only screen and (max-width: 600px) {
  .primary {
    margin-top: 10px;
  }
}
</style>