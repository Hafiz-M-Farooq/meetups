<template>
  <v-alert
    type="error"
    dismissible
    color="red"
    border="left"
    elevation="2"
    colored-border
    @input="onClick"
    :value="true"
  >{{text}}</v-alert>
</template>

<script>
export default {
  props: ["text"],
  methods: {
    onClick() {
      this.$emit("dismissed");
    }
  }
};
</script>