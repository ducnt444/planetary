<template>
  <div class="d-flex">
    <button @click="testGetAllUsers" class="mx-2">TEST 1</button>
    <button @click="testPostNewUser" class="mx-2">TEST 2</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "TestButton",
  methods: {
    testGetAllUsers() {
      axios
        .get("https://my-json-server.typicode.com/ducnt444/planetary/users")
        .then((res) => {
          let users = res.data;
          console.log(users);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    testPostNewUser() {
      axios
        .post("https://my-json-server.typicode.com/ducnt444/planetary/users", {
          id: 3,
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