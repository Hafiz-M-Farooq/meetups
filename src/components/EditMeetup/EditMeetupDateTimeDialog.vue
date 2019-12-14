<script>
export default {
  /* eslint-disable */
};
</script>
<template>
  <v-dialog persistent max-width="100%" v-model="editDialog">
    <template v-slot:activator="{ on }">
      <v-btn accent v-on="on" color="primary" class="mt-3 mb-3">Edit Date And Time</v-btn>
    </template>
    <template>
      <v-card>
        <v-container>
          <v-layout row wrap class="mt-5">
            <h2 style="margin: 0 auto">Edit Meetup Date & Time</h2>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row wrap class="mt-5 mb-5">
            <v-flex xs12>
              <v-layout row>
                <v-date-picker v-model="editableDate"></v-date-picker>
                <v-spacer></v-spacer>
                <v-time-picker
                  format="24hr"
                  v-model="editableTime"
                  :allowed-hours="allowedHours"
                  :allowed-minutes="allowedMinutes"
                ></v-time-picker>
              </v-layout>
              <v-layout row class="mt-5 mb-5">
                <v-spacer></v-spacer>
                <v-btn class="red mr-10" style="color: white" @click="editDialog = false">Close</v-btn>
                <v-btn class="green" style="color: white" text @click="onSaveChanges">Save</v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  props: ["meetup"],
  data() {
    return {
      editDialog: false,
      editableDate: null,
      editableTime: null
    };
  },
  computed: {
    submittableDateTime() {
      const date = new Date(this.editableDate);
      if (typeof this.editableTime === "string") {
        let hours = this.editableTime.match(/^(\d+)/)[1];
        let minutes = this.editableTime.match(/:(\d+)/)[1];
        date.setHours(hours);
        date.setMinutes(minutes);
      } else {
        date.setHours(this.time.getHours());
        date.setMinutes(this.time.getMinutes());
      }
      return date;
    }
  },
  methods: {
    onSaveChanges() {
      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        date: this.submittableDateTime
      });
    },
    allowedHours: v => v % 2,
    allowedMinutes: v => v >= 10 && v <= 50
  },
  created() {
    this.editableDate = new Date(this.meetup.date).toISOString().substr(0, 10);
    this.editableTime = new Date(this.meetup.date);
  }
};
</script>