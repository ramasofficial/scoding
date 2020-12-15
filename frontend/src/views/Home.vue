<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <strong>Home page</strong>
      </div>
      <div class="card-body">
        Content
        <div v-if="!getLoggedIn">
          You are need to logged_in
        </div>
        <div v-else>
          Hello {{ getUser.name }}, you are
          <span v-if="getUser.is_admin == true">admin</span
          ><span v-else>user</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",

  computed: {
    ...mapGetters(["getLoggedIn", "getUser"])
  },

  mounted() {
    if (localStorage.getItem("access_token")) {
      this.getUserData();
    }
  },

  methods: {
    ...mapActions(["getUserData"])
  }
};
</script>
