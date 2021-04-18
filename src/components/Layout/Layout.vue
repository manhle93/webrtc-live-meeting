<template>
  <v-layout>
    <Sidebar />
    <v-main class="content">
      <Header />
      <router-view />
    </v-main>
  </v-layout>
</template>

<script>
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

export default {
  name: "Layout",
  components: {
    Sidebar,
    Header,
  },
};
</script>

<style>
</style>