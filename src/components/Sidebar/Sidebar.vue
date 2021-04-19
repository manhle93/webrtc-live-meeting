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
        <v-list-item v-for="item in USERS" :key="item.title" class="mt-3">
          <v-avatar color="#01579B" size="45" class="mr-2">
            <span class="white--text headline">{{
              item.fullName ? item.fullName[0] : ""
            }}</span>
          </v-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ item.fullName }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.username }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon>
              <v-icon color="grey lighten-1">mdi-information</v-icon>
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
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      socket.on("user connected", (data) => {
        let users = this.USERS ? this.USERS : [];
        users.push(data);
        this.USERS = users;
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
  },
};
</script>
