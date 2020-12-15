<template>
  <div class="container login_form">
    <div class="card">
      <div class="card-header">
        <strong>Login</strong>
      </div>
      <div class="card-body">
        <form @submit.prevent="login">
          <div class="alert alert-danger" v-if="error">
            {{ error }}
          </div>

          <div class="mb-3">
            <label>Email address</label>
            <input
              type="email"
              class="form-control"
              v-model="details.username"
            />
          </div>
          <div class="mb-3">
            <label>Password</label>
            <input
              type="password"
              class="form-control"
              v-model="details.password"
            />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Login",

  data() {
    return {
      details: {
        username: "",
        password: ""
      }
    };
  },

  methods: {
    ...mapActions(["setError"]),

    login() {
      const formData = {
        username: this.details.username,
        password: this.details.password
      };
      this.$store.dispatch("login", formData).then(response => {
        if (response.data.access_token) {
          this.$router.push({ name: "Home" });
        }
      });
    }
  },

  computed: {
    ...mapGetters({
      error: "getError"
    })
  },

  mounted() {
    this.$store.commit("setError", null);
  }
};
</script>
