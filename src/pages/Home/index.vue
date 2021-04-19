<template v-slot:body>
  <v-layout column justify-space-between>
    <v-app-bar elevation="1" color="#CFD8DC">
      <div class="d-flex align-center">
        <v-avatar color="pink" size="40">
          <span class="white--text headline">M</span>
        </v-avatar>

        <span class="ml-4" style="font-size: 18px; color: black"
          >Manh Le Van</span
        >
      </div>
      <v-spacer></v-spacer>
      <v-btn dark color="teal" fab small><v-icon>mdi-video</v-icon></v-btn>
    </v-app-bar>
    <div style="height: 100%" ></div>
    <v-textarea
      v-model="messages"
      solo
      label="Gửi tin nhắn tới"
      clearable
      :rows="2"
    ></v-textarea>
  </v-layout>
</template>

<script>
//import socket from "../../socket";
export default {
  data: () => ({
    messages: "",
  }),
  computed: {
    ME() {
      return this.$store.state.users.me;
    },
    USERS() {
      return this.$store.state.users.users.filter(
        (el) => el.username != this.ME.username
      );
    },
  },
  mounted() {
    if (!this.ME || !this.ME.username) {
      this.$router.push("/login");
    }
  },
  methods: {},
};
</script>

<style>
</style>