import axios from "axios";
import { API_URL } from "../config/app";

export default {
  state: {
    todos: [],
    disabled: false,
    user_options: [],
    todo_submit: false,
    completed: false
  },

  getters: {
    getTodos: state => state.todos,
    getUserOptions: state => state.user_options,
    getTodoSubmit: state => state.todo_submit,
    getCompleted: state => state.completed
  },

  mutations: {
    setTodos(state, todos) {
      state.todos = todos;
    },
    setUserOptions(state, userOptions) {
      state.user_options = userOptions;
    },
    setTodoSubmit(state, todoSubmit) {
      state.todo_submit = todoSubmit;
    },
    setCompleted(state, completed) {
      state.completed = completed;
    }
  },

  actions: {
    todo_table({ commit }, options) {
      const user = JSON.parse(localStorage.getItem("user"));

      let api_url;
      if (user.is_admin == 1) {
        api_url =
          API_URL +
          "/todos/admin?size=" +
          options.size +
          "&sort=" +
          options.sort;
      } else {
        api_url =
          API_URL +
          "/todos/?id=" +
          user.id +
          "&size=" +
          options.size +
          "&sort=" +
          options.sort;
      }

      return new Promise(resolve => {
        axios
          .get(api_url, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
              Accept: "application/json"
            }
          })
          .then(response => {
            resolve(response);
            commit("setTodos", response.data);
            commit("setCompleted", true);
          });
      });
    },

    get_user_options({ commit }) {
      axios
        .get("/select2_users", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
            Accept: "application/json"
          }
        })
        .then(response => {
          commit("setUserOptions", response.data);
        });
    },

    create_todo({ commit }, formData) {
      commit("setTodoSubmit", true);
      return new Promise(resolve => {
        axios
          .post(
            "/todos/create",
            {
              task: formData.task,
              assigned_to: formData.assigned_to
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
            commit("setErrors", []);
            commit("setTodoSubmit", false);
          })

          .catch(error => {
            commit("setErrors", error.response.data.errors);
            commit("setTodoSubmit", false);
          });
      });
    }
  }
};
