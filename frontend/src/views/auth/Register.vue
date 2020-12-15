<template>
  <div class="container login_form">
    <div class="card">
      <div class="card-header">
        <strong>Register</strong>
      </div>
      <div class="card-body">
        <form @submit.prevent="register">
          <div class="mb-3">
            <label>Name</label>
            <input type="text" class="form-control" v-model="details.name" />
            <div class="alert alert-danger error_register" v-if="errors.name">
              {{ errors.name[0] }}
            </div>
          </div>
          <div class="mb-3">
            <label>Email address</label>
            <input
              type="email"
              class="form-control"
              v-model="details.username"
            />
            <div class="alert alert-danger error_register" v-if="errors.email">
              {{ errors.email[0] }}
            </div>
          </div>
          <div class="mb-3">
            <label>Password</label>
            <input
              type="password"
              class="form-control"
              v-model="details.password"
            />
            <div
              class="alert alert-danger error_register"
              v-if="errors.password"
            >
              {{ errors.password[0] }}
            </div>
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
  name: "Register",

  data() {
    return {
      details: {
        name: "",
        username: "",
        password: ""
      }
    };
  },

  methods: {
    ...mapActions(["setErrors"]),

    register() {
      const formData = {
        name: this.details.name,
        username: this.details.username,
        password: this.details.password
      };
      this.$store.dispatch("register", formData).then(response => {
        if (response.data) {
          this.$router.push({ name: "Login" });
        }
      });
    }
  },

  computed: {
    ...mapGetters({
      errors: "getErrors"
    })
  },

  mounted() {
    this.$store.commit("setErrors", []);
  }
};
</script>
