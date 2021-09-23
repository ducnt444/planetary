<template>
  <div class="d-flex">
    <button @click="testGetAllUsers" class="mx-2">TEST 1</button>
    <button @click="testPostNewUser" class="mx-2">TEST 2</button>
    <button @click="logSignAction(userInput)" class="mx-2">TEST 3</button>
    <button @click="logoutOnAPI" class="mx-2">TEST 4</button>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  name: "TestButton",
  data() {
    return {};
  },
  computed: {
    userInput() {
      return {
        type: "login",
        userData: {
          usernameInput: "demo",
          passwordInput: "123",
        },
      };
    },
  },
  methods: {
    logoutOnAPI() {
      axios
        .put("https://test-heroku444.herokuapp.com/currentUser", {
          username: null,
          password: null,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    testGetAllUsers() {
      axios
        .get("https://test-heroku444.herokuapp.com/posts")
        .then((res) => {
          this.users = res.data;
          console.log(this.users);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    testPostNewUser() {
      axios
        .post("https://test-heroku444.herokuapp.com/posts", {
          username: "test",
          password: "tessts",
        })
        .then((res) => {
          let users = res.data;
          console.log(users);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ...mapActions(["logSignAction"]),
  },
};
</script>

<style scoped>
.d-flex {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
}
</style>