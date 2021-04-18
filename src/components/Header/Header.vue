<template>
  <v-app-bar elevation="1">
    <div class="d-flex align-center">
      <v-btn icon @click="toggleSidbar">
        <v-icon size="38">mdi-menu</v-icon>
      </v-btn>
    </div>

    <v-spacer></v-spacer>
      <v-avatar>
        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
      </v-avatar>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    toggleSidbar(){
      this.$store.dispatch('sidebar/toggleSidbar')
    }
  }
};
</script>

<style>
</style>