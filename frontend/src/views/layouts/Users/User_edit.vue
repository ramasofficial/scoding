<template>
  <div class="container login_form" v-if="user.is_admin == 1">
    <div class="card">
      <div class="card-header">
        <strong>Edit user {{ old_name }}</strong>
      </div>
      <div class="card-body">
        <form
          @submit.prevent="user_edit(this.$route.params.id)"
          autocomplete="off"
        >
          <div class="mb-3">
            <label>Name</label>
            <input type="text" class="form-control" v-model="name" />
            <div class="alert alert-danger error_register" v-if="errors.name">
              {{ errors.name[0] }}
            </div>
          </div>
          <div class="mb-3">
            <label>Enter a new password, if you want to change it</label>
            <input type="text" class="form-control" v-model="password" />
            <div
              class="alert alert-danger error_register"
              v-if="errors.password"
            >
              {{ errors.password[0] }}
            </div>
          </div>
          <div class="mb-3">
            <label>Status</label>
            <select name="is_admin" class="form-control" v-model="is_admin">
              <option value="0">User</option>
              <option value="1">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="name == null"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "User edit",
  data() {
    return {
      name: null,
      password: null,
      is_admin: 0,
      old_name: null
    };
  },

  mounted() {
    this.$store.commit("setErrors", []);
    this.$store
      .dispatch("get_user_info", this.$route.params.id)
      .then(response => {
        this.name = response.data.name;
        this.old_name = response.data.name;
        this.is_admin = response.data.is_admin;
      });
  },

  methods: {
    ...mapActions(["setErrors", "get_user_info", "user_edit"]),
    user_edit(id) {
      const formData = {
        name: this.name,
        is_admin: this.is_admin,
        id: id
      };
      if (this.password) formData.password = this.password;
      this.$store.dispatch("user_edit", formData).then(() => {
        this.$router.push({ name: "Users" });
      });
    }
  },

  computed: {
    ...mapGetters({
      errors: "getErrors",
      user: "getUser"
    })
  }
};
</script>
