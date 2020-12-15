import { createStore } from "vuex";
import axios from "axios";
import { API_URL } from "../config/app";
import users from "./users.js";
import todos from "./todos.js";

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common["Content-type"] = "application/json;";

export default createStore({
  state: {
    access_token: null,
    logged_in: null,
    error: null,
    errors: [],
    user: []
  },
  getters: {
    getAccessToken: state => state.access_token,
    getError: state => state.error,
    getErrors: state => state.errors,
    getLoggedIn: state => state.logged_in,
    getUser: state => state.user
  },
  mutations: {
    setAccessToken(state, authData) {
      state.access_token = authData;
    },
    setError(state, error) {
      state.error = error;
    },
    setErrors(state, errors) {
      state.errors = errors;
    },
    setLoggedIn(state, logged_in) {
      state.logged_in = logged_in;
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    login({ commit }, authData) {
      commit("setError", null);
      commit("setLoggedIn", null);
      commit("setAccessToken", null);
      localStorage.removeItem("access_token");

      return new Promise(resolve => {
        axios
          .post("/login", {
            username: authData.username,
            password: authData.password
          })

          .then(res => {
            commit("setAccessToken", res.data.access_token);
            commit("setLoggedIn", true);

            localStorage.setItem("access_token", res.data.access_token);

            resolve(res);
          })

          .catch(error => {
            commit("setError", error.response.data);
            localStorage.removeItem("access_token");
          });
      });
    },

    register({ commit }, authData) {
      commit("setError", null);
      commit("setLoggedIn", null);
      commit("setAccessToken", null);
      localStorage.removeItem("access_token");

      return new Promise(resolve => {
        axios
          .post("/register", {
            name: authData.name,
            email: authData.username,
            password: authData.password
          })

          .then(res => {
            resolve(res);
          })

          .catch(error => {
            commit("setErrors", error.response.data.errors);
          });
      });
    },

    getUserData({ commit }) {
      axios
        .get("/get_user", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
            Accept: "application/json"
          }
        })

        .then(res => {
          commit("setLoggedIn", true);
          commit("setUser", res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        })

        .catch(error => {
          commit("setError", error.response.data);
          commit("setLoggedIn", null);
          commit("setAccessToken", null);
          commit("setUser", []);

          localStorage.removeItem("access_token");
        });
    },

    logout({ commit }) {
      return new Promise(resolve => {
        axios
          .post(
            "/logout",
            {},
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
                Accept: "application/json"
              }
            }
          )

          .then(res => {
            commit("setError", null);
            commit("setLoggedIn", null);
            commit("setLoggedIn", null);
            commit("setAccessToken", null);
            commit("setUser", []);

            localStorage.removeItem("access_token");
            localStorage.removeItem("user");
            resolve(res);
          })

          .catch(() => {
            commit("setError", null);
            commit("setLoggedIn", null);
            commit("setAccessToken", null);
            commit("setUser", []);

            localStorage.removeItem("access_token");
            localStorage.removeItem("user");
          });
      });
    }
  },
  modules: {
    users,
    todos
  }
});
