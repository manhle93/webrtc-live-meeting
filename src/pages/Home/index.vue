<template v-slot:body>
  <v-layout column justify-space-between>
    <v-app-bar elevation="1" color="#CFD8DC" v-if="selectedUser.user.userID">
      <div class="d-flex align-center">
        <v-avatar color="pink" size="40">
          <span class="white--text headline">{{
            selectedUser.user.fullName[0]
          }}</span>
        </v-avatar>

        <span class="ml-4" style="font-size: 18px; color: black">{{
          selectedUser.user.fullName
        }}</span>
      </div>
      <v-spacer></v-spacer>
      <v-btn dark color="teal" fab small><v-icon>mdi-video</v-icon></v-btn>
    </v-app-bar>
    <div style="height: 500px"></div>
    <v-layout align-center v-if="selectedUser.user.userID">
      <v-textarea
        v-model="message"
        solo
        label="Gửi tin nhắn tới"
        clearable
        :rows="2"
        hide-details
        style="border-radius: 15px"
      ></v-textarea>
      <v-btn icon color="pink" @click="sendMessage" :disabled="!message">
        <v-icon class="pl-3" size="36"> mdi-send </v-icon>
      </v-btn>
    </v-layout>
  </v-layout>
</template>

<script>
import socket from "../../socket";
//import socket from "../../socket";
export default {
  data: () => ({
    message: "",
  }),
  computed: {
    ME() {
      return this.$store.state.users.me;
    },
    // USERS() {
    //   return this.$store.state.users.users
    // },
    selectedUser() {
      return this.$store.state.users.selectedUser;
    },
  },
  mounted() {
    if (!this.ME || !this.ME.username) {
      this.$router.push("/login");
    }
  },
  methods: {
    sendMessage() {
      if (this.message && this.selectedUser.userID) {
        socket.emit("private message", {
          content: this.message,
          to: this.selectedUser.userID,
        });
        this.$store.dispatch('users/setSelectUserMessage', {content: this.message, fromSelf: true})
      }
    },
    // receiveMessage(){
    //   socket.on('private message', data => {
        
    //   })
    // }
  },
};
</script>

<style>
</style>