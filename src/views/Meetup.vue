<template>
  <Meetup :id="meetupid"></Meetup>
</template>


<script>
import Meetup from "../components/Meetup";

export default {
  props: ["id"],
  data() {
    return {
      meetupid: this.id
    };
  },
  components: {
    Meetup
  }
};
</script>
