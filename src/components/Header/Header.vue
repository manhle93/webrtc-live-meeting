<template>
  <v-app-bar elevation="1">
    <div class="d-flex align-center">
      <v-btn icon @click="toggleSidbar">
        <v-icon size="38">mdi-menu</v-icon>
      </v-btn>
    </div>

    <v-spacer></v-spacer>
    <v-avatar color="green">
      <span class="white--text headline">{{ME.fullName ? ME.fullName[0]: ""}}</span>
    </v-avatar>
    <span class="ml-4" style="font-size: 24px; color: black;">{{ME.fullName}}</span>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({}),
  computed: {
    ME() {
      return this.$store.state.users.me;
    },
  },
  methods: {
    toggleSidbar() {
      this.$store.dispatch("sidebar/toggleSidbar");
    },
  },
};
</script>

<style>
</style>