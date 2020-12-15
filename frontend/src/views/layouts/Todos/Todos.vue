<template>
  <div class="container" v-if="logged_in">
    <div class="card">
      <div class="card-header">
        <strong>ToDos</strong>
      </div>
      <div class="card-body">
        <div v-if="todos.length < 1 && completed == false" class="text-center">
          <strong>Loading...</strong>
        </div>
        <div v-else-if="todos.length < 1 && completed == true" class="text-center">
          <strong>No records.</strong>
        </div>
        <div v-else>
          <div v-if="user.is_admin == 1">
            <form @submit.prevent="create_todo">
              <div class="row mb-2">
                <div class="col-md-12">
                  <h2>Create new ToDo</h2>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-5 cs_users_padding">
                  <input
                    type="text"
                    name="task"
                    class="form-control form-control-sm"
                    :class="{ 'is-invalid': errors.task }"
                    placeholder="Task"
                    v-model="task"
                  />
                  <div
                    class="alert alert-danger error_register"
                    v-if="errors.task"
                  >
                    {{ errors.task[0] }}
                  </div>
                </div>
                <div
                  class="col-md-5 cs_users_padding"
                  :class="{ 'select2-invalid': errors.assigned_to }"
                >
                  <Select2
                    v-model="selected_user"
                    :options="user_options"
                    :settings="{ allowClear: true }"
                    placeholder="Select user"
                  />
                  <div
                    class="alert alert-danger error_register"
                    v-if="errors.assigned_to"
                  >
                    {{ errors.assigned_to[0] }}
                  </div>
                </div>
                <div class="col-md-2 cs_users_padding">
                  <button
                    type="submit"
                    class="btn btn-success btn-sm"
                    :disabled="todo_submit == true"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="row mb-2 text-left">
            <div class="col-md-3">
              Sort options:
              <select
                class="form-control form-control-sm"
                v-model="options.sort"
                @change="sort_todos_table"
              >
                <option value="0">Default</option>
                <option value="1">Date DESC</option>
                <option value="2">Date ASC</option>
                <option value="3">Status DESC</option>
                <option value="4">Status ASC</option>
              </select>
            </div>
          </div>
          <table class="table table-bordered table-striped text-center">
            <thead>
              <tr>
                <th width="35%" class="text-left">Task</th>
                <th width="15%">Status</th>
                <th v-if="user.is_admin == 1" width="15%">Assigned To</th>
                <th width="20%">Date</th>
                <th width="15%" v-if="user.is_admin == 0">Change status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="todo in todos" :key="todo.id" class="text-center">
                <td class="text-left">{{ todo.task }}</td>
                <td style="color: red;" v-if="todo.status == 0">to do</td>
                <td style="color: orange;" v-if="todo.status == 1">
                  in progress
                </td>
                <td style="color: green;" v-if="todo.status == 2">done</td>
                <td v-if="user.is_admin == 1">{{ todo.assigned_name }}</td>
                <td>{{ moment(todo.created_at).format("YYYY-MM-DD H:mm") }}</td>
                <td v-if="user.is_admin == 0">
                  <select
                    name=""
                    class="form-control form-control-sm"
                    @change.prevent="change_status($event, todo.id)"
                    v-model="todo.status"
                  >
                    <option value="0">to do</option>
                    <option value="1">in progress</option>
                    <option value="2">done</option>
                  </select>
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
import moment from "moment";
import axios from "axios";
import Select2 from "vue3-select2-component";

export default {
  components: { Select2 },
  data() {
    return {
      options: {
        size: 25,
        sort: 0
      },
      moment: moment,
      task: null,
      selected_user: null
    };
  },

  mounted() {
    this.todo_table(this.options);
    this.get_user_options();
  },

  methods: {
    ...mapActions(["todo_table", "get_user_options"]),

    change_status(event, id) {
      axios.put(
        "todos/status/" + id,
        {
          status: event.target.value
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
            Accept: "application/json"
          }
        }
      );
    },

    sort_todos_table() {
      this.todo_table(this.options);
    },

    create_todo() {
      const formData = {
        task: this.task,
        assigned_to: this.selected_user
      };
      this.$store.dispatch("create_todo", formData).then(() => {
        this.task = null;
        this.selected_user = null;
        this.todo_table(this.options);
      });
    }
  },

  computed: {
    ...mapGetters({
      todos: "getTodos",
      user: "getUser",
      errors: "getErrors",
      user_options: "getUserOptions",
      todo_submit: "getTodoSubmit",
      completed: "getCompleted",
      logged_in: "getLoggedIn"
    })
  }
};
</script>
