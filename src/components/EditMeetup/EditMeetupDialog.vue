<template>
  <v-dialog persistent max-width="350px" v-model="editDialog">
    <template v-slot:activator="{ on }">
      <v-btn fab accent v-on="on">
        <v-icon>mdi-border-color</v-icon>
      </v-btn>
    </template>
    <template>
      <v-card>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-title>Edit Meetup</v-card-title>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-text>
                <v-text-field
                  name="title"
                  label="Title"
                  id="title"
                  v-model="editedTitle"
                  aria-required="true"
                ></v-text-field>
                <v-textarea
                  name="description"
                  label="Description"
                  id="description"
                  v-model="editedDescription"
                  aria-required="true"
                ></v-textarea>
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-actions>
                <v-btn color="red" text @click="editDialog = false">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="green" text @click="onSaveChanges">Save</v-btn>
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
  props: ["meetup"],
  data() {
    return {
      editDialog: false,
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description
    };
  },
  methods: {
    onSaveChanges() {
      if (
        this.editedTitle.trim() === "" ||
        this.editedDescription.trim() === ""
      ) {
        return;
      }
      this.editDialog = false;
      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        title: this.editedTitle,
        description: this.editedDescription
      });
    }
  }
};
</script>