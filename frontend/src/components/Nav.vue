<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link to="/" class="navbar-brand">Vue.js APP</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active"
            >Home</router-link
          >
        </li>
        <li class="nav-item" v-if="!getLoggedIn">
          <router-link to="/login" class="nav-link" active-class="active"
            >Login</router-link
          >
        </li>
        <li class="nav-item" v-if="!getLoggedIn">
          <router-link to="/register" class="nav-link" active-class="active"
            >Register</router-link
          >
        </li>
        <li class="nav-item" v-if="getLoggedIn">
          <router-link to="/todos" class="nav-link" active-class="active"
            >Todos</router-link
          >
        </li>
        <li class="nav-item" v-if="getUser.is_admin == true">
          <router-link to="/users" class="nav-link" active-class="active"
            >Users</router-link
          >
        </li>
        <li class="nav-item" v-if="getLoggedIn">
          <a class="nav-link" href="#" @click="logout">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Nav",

  methods: {
    ...mapActions(["logout"]),
    logout() {
      this.$store.dispatch("logout").then(response => {
        if (response.data) {
          this.$router.push({ name: "Login" });
        }
      });
    }
  },

  computed: {
    ...mapGetters(["getLoggedIn", "getUser"])
  }
};
</script>
