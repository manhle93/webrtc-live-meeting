<template>
  <v-navigation-drawer permanent :mini-variant.sync="mini" width="260px">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title"> Application </v-list-item-title>
        <v-list-item-subtitle> subtext </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list subheader two-line nav dense>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item
          v-for="item in USERS"
          :key="item.title"
          class="mt-3"
          @click="selectUser(item)"
        >
          <v-avatar color="#01579B" size="45" class="mr-2">
            <span class="white--text headline">{{
              item.fullName ? item.fullName[0] : ""
            }}</span>
          </v-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ item.fullName }}</v-list-item-title>
            <v-list-item-subtitle>
              <v-chip
                :color="item.connected ? 'success' : 'pink'"
                x-small
                dark
                >{{ item.connected ? "Online" : "Offline" }}</v-chip
              ></v-list-item-subtitle
            >
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon color="pink" v-if="item.hasNewMessages">
              <v-icon>mdi-alert-circle</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import socket from "../../socket";
export default {
  data() {
    return {
      selectedItem: null,
      messages: [],
    };
  },
  computed: {
    mini() {
      return this.$store.state.sidebar.miniSidebar;
    },
    USERS: {
      get() {
        return this.$store.state.users.users;
      },
      set(value) {
        return value;
      },
    },
    selectedUser() {
      return this.$store.state.users.selectedUser;
    },
  },
  created() {
    this.getUsers();
    this.statusUser();
    this.receiveMessage();
  },
  methods: {
    async getUsers() {
      socket.on("user connected", (data) => {
        this.initReactiveProperties(data);
        this.USERS.push(data);
        this.$store.dispatch("users/setUsers", this.USERS);
        this.$toast.info(data.fullName + "Đã tham gia kênh chat", {
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
      });
    },
    statusUser() {
      socket.on("user disconnected", (id) => {
        console.log("dis", id);
        for (let i = 0; i < this.USERS.length; i++) {
          const user = this.USERS[i];
          if (user.userID === id) {
            user.connected = false;
            break;
          }
        }
      });
    },
    selectUser(data) {
      this.USERS.forEach((el) => {
        if (el.userID == data.userID) {
          this.$store.dispatch("users/setSelectUser", data);
          this.$store.dispatch("users/setSelectUserMessage", el.messages);
          el.hasNewMessages = false
        }
      });
    },
    initReactiveProperties(user) {
      user.connected = true;
      user.messages = [];
      user.hasNewMessages = false;
    },
    receiveMessage() {
      socket.on("private message", (data) => {
        let messages = [];
        this.USERS.forEach((el) => {
          if (el.userID == data.from) {
            el.messages.push(data);
            let hasNewMessages =
              !(this.selectedUser.user.userID === data.from)
            messages = el.messages;
            el.hasNewMessages = hasNewMessages
          }
        });
        this.$store.dispatch("users/setUsers", this.USERS);
        if (this.selectedUser.user.userID) {
          this.$store.dispatch("users/setSelectUserMessage", messages);
        }
      });
    },
  },
  destroyed() {
    socket.off("connect");
    socket.off("disconnect");
    socket.off("users");
    socket.off("user connected");
    socket.off("user disconnected");
    socket.off("private message");
  },
};
</script>
