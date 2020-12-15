<template>
  <div class="container" v-if="user.is_admin == 1">
    <div class="card">
      <div class="card-header">
        <strong>Users</strong>
      </div>
      <div class="card-body">
        <div v-if="posts.length < 1" class="text-center">
          <strong>Loading...</strong>
        </div>
        <div v-else>
          <form @submit.prevent="new_user">
            <div class="row mb-2">
              <div class="col-md-12">
                <h2>Create new user</h2>
              </div>
              <div class="col-md-2 cs_users_padding">
                <input
                  type="text"
                  name="name"
                  class="form-control form-control-sm"
                  :class="{ 'is-invalid': errors.name }"
                  placeholder="Name"
                  v-model="name"
                />
                <div
                  class="alert alert-danger error_register"
                  v-if="errors.name"
                >
                  {{ errors.name[0] }}
                </div>
              </div>
              <div class="col-md-3 cs_users_padding">
                <input
                  type="email"
                  name="email"
                  class="form-control form-control-sm"
                  :class="{ 'is-invalid': errors.email }"
                  placeholder="Email"
                  v-model="email"
                />
                <div
                  class="alert alert-danger error_register"
                  v-if="errors.email"
                >
                  {{ errors.email[0] }}
                </div>
              </div>
              <div class="col-md-3 cs_users_padding">
                <input
                  type="text"
                  name="password"
                  class="form-control form-control-sm"
                  :class="{ 'is-invalid': errors.password }"
                  placeholder="Password"
                  v-model="password"
                />
                <div
                  class="alert alert-danger error_register"
                  v-if="errors.password"
                >
                  {{ errors.password[0] }}
                </div>
              </div>
              <div class="col-md-2 cs_users_padding">
                <select
                  name="is_admin"
                  class="form-control form-control-sm"
                  v-model="is_admin"
                >
                  <option value="0">User</option>
                  <option value="1">Admin</option>
                </select>
              </div>
              <div class="col-md-1 cs_users_padding">
                <button
                  type="submit"
                  class="btn btn-success btn-sm"
                  :disabled="disabled == true"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="post in posts" :key="post.id">
                <td>{{ post.id }}</td>
                <td>{{ post.name }}</td>
                <td>{{ post.email }}</td>
                <td>{{ post.is_admin == 0 ? "user" : "admin" }}</td>
                <td>
                  <router-link
                    :to="{ name: 'User edit', params: { id: post.id } }"
                    >Edit</router-link
                  >
                  <a
                    style="margin-left: 8px;"
                    href="#"
                    @click.prevent="delete_user(post.id)"
                    >Delete</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Users",
  data() {
    return {
      size: 25,
      name: null,
      email: null,
      password: null,
      is_admin: 0
    };
  },

  mounted() {
    this.$store.commit("setErrors", []);
    this.api_table(this.size);
  },

  methods: {
    ...mapActions(["setErrors", "api_table", "new_user"]),

    new_user() {
      const formData = {
        name: this.name,
        email: this.email,
        password: this.password,
        is_admin: this.is_admin
      };
      this.$store.dispatch("new_user", formData).then(() => {
        this.api_table(this.size);
        this.name = null;
        this.email = null;
        this.password = null;
        this.is_admin = 0;
      });
    },

    delete_user(id) {
      this.$store.dispatch("delete_user", id).then(() => {
        this.api_table(this.size);
      });
    }
  },

  computed: {
    ...mapGetters({
      errors: "getErrors",
      posts: "getPosts",
      disabled: "getDisabled",
      user: "getUser"
    })
  }
};
</script>
