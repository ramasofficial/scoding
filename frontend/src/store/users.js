import axios from "axios";
import { API_URL } from "../config/app";

export default {
  state: {
    posts: [],
    disabled: false
  },

  getters: {
    getPosts: state => state.posts,
    getDisabled: state => state.disabled
  },

  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setDisabled(state, disabled) {
      state.disabled = disabled;
    }
  },

  actions: {
    api_table({ commit }, size) {
      return new Promise(resolve => {
        axios
          .get(API_URL + "/users?size=" + size, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
              Accept: "application/json"
            }
          })
          .then(response => {
            resolve(response);
            commit("setPosts", response.data);
          });
      });
    },

    new_user({ commit }, formData) {
      commit("setDisabled", true);
      return new Promise(resolve => {
        axios
          .post("/register", {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            is_admin: formData.is_admin
          })

          .then(res => {
            resolve(res);
            commit("setErrors", []);
            commit("setDisabled", false);
          })

          .catch(error => {
            commit("setErrors", error.response.data.errors);
            commit("setDisabled", false);
          });
      });
    },

    delete_user({ dispatch }, id) {
      return new Promise(resolve => {
        axios
          .delete("/users/destroy/" + id, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
              Accept: "application/json"
            }
          })

          .then(res => {
            dispatch("api_table");
            resolve(res);
          });
      });
    },

    get_user_info({ commit }, id) {
      return new Promise(resolve => {
        axios
          .get("/users/" + id, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
              Accept: "application/json"
            }
          })

          .then(res => {
            console.log(commit);
            resolve(res);
          });
      });
    },

    user_edit({ commit }, formData) {
      return new Promise(resolve => {
        axios
          .put(
            "users/update/" + formData.id,
            {
              name: formData.name,
              password: formData.password,
              is_admin: formData.is_admin
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
                Accept: "application/json"
              }
            }
          )

          .then(res => {
            resolve(res);
          })

          .catch(error => {
            commit("setErrors", error.response.data.errors);
          });
      });
    }
  }
};
