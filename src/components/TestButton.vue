<template>
  <div class="d-flex">
    <button @click="button3" class="mx-2">TEST 3</button>
    <button @click="button4" class="mx-2">TEST 4</button>
  </div>
</template>

<script>
import axios from "axios";
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
    button3() {
      axios
        .get(`https://test-heroku444.herokuapp.com/usersList/0`)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    button4() {
      axios
        .patch(`https://test-heroku444.herokuapp.com/usersList/0`, {
          bookings: [{ planet: "a" }, { planet: "b" }],
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
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