<template>
  <Nav />
  <router-view />
</template>

<script>
import Nav from "./components/Nav.vue";
import { mapActions } from "vuex";

export default {
  name: "App",

  components: {
    Nav
  },

  mounted() {
    if (localStorage.getItem("access_token")) {
      this.getUserData();
    }
  },

  methods: {
    ...mapActions(["getUserData", "logout"])
  }
};
</script>

<style>
@import "./assets/css/app.css";
</style>
