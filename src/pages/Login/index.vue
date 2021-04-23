<template>
  <v-layout align-center justify-center>
    <v-card width="500px" class="pa-4">
      <v-card-title>Login</v-card-title>
      <v-text-field
        v-model="username"
        solo
        label="Nhập tên đăng nhập"
        clearable
      ></v-text-field>
      <v-text-field
        v-model="fullName"
        solo
        label="Tên của bạn"
        clearable
      ></v-text-field>
      <v-btn depressed color="primary" style="width: 100%" @click="login()">
        Login
      </v-btn>
    </v-card>
  </v-layout>
</template>

<script>
import socket from "../../socket";
export default {
  data: () => ({
    username: "",
    fullName: "",
    usernameAlreadySelected: false,
  }),
  mounted() {
    this.onErrConectSocket();
    this.onConnected();
  },

  methods: {
    login() {
      this.usernameAlreadySelected = true;
      socket.auth = { username: this.username, fullName: this.fullName };
      socket.connect();
    },
    onErrConectSocket() {
      socket.on("connect_error", (err) => {
        if (err.message === "invalid username") {
          this.usernameAlreadySelected = false;
          this.$toast.info("Tên đăng nhập không thể bỏ trống", {
            position: "top-center",
            timeout: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
          });
        }
      });
    },
    onConnected() {
      socket.on("connect", () => {
        socket.on("users", (data) => {
          let users = [];
          data.forEach((user) => {
            user.self = user.userID === socket.id;
            this.initReactiveProperties(user)
            users.push(user);
          });

          this.$store.dispatch("users/setUsers", users);
        });
        this.$store.dispatch("users/setMe", {
          username: this.username,
          fullName: this.fullName,
        });
        this.$router.push("/");
      });
    },

    initReactiveProperties(user) {
      user.connected = true;
      user.messages = [];
      user.hasNewMessages = false;
    },
  },
};
</script>

<style>
</style>