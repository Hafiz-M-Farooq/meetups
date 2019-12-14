<template>
  <v-container>
    <v-label row wrap>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="max-auto mb-3" v-for="meetup in loadedMeetups" :key="meetup.id">
          <v-container fluid>
            <v-layout row class="pa-3">
              <v-flex md4 sm4 xs5>
                <v-img :src="meetup.imageURL"></v-img>
              </v-flex>
              <v-flex md8 sm8 xs7>
                <v-card-text class="text--primary">
                  <h3>{{meetup.title}}</h3>
                  <p>{{meetup.description}}</p>
                  <h6>{{meetup.date | date}}</h6>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="orange" text :to="'meetup/'+ meetup.id">
                    <v-icon left>mdi-forward</v-icon>View Meetup
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-label>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["loadedMeetups"])
  }
};
</script>