import Vue from "vue";
import Vuex from "vuex";
import { INCREMENT_TYPE, INCREMENTBY_TYPE } from "./mutationType";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    storeCount: 3,
    todos: [
      { id: 1, text: "task 1", done: true },
      { id: 2, text: "task 2", done: false },
      { id: 3, text: "task 3", done: true },
    ],
  },
  getters: {
    //Property-Style Access (computed)
    doneTodos: (state) => {
      return state.todos.filter((todo) => todo.done);
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length;
    },

    //Method-Style Access (methods) tiện dùng khi cần query 1 array
    getTodoById: (state) => (id) => {
      return state.todos.find((todo) => todo.id === id);
    },
  },
  mutations: {
    //Style 1: original
    // increment(state, payload) {
    //   state.storeCount += payload.amount;
    // },

    //Style 2: ES2015 computed property name
    [INCREMENT_TYPE](state) {
      state.storeCount++;
    },
    [INCREMENTBY_TYPE](state, payload) {
      state.storeCount += payload.amount;
    },
  },
});

export default store;
