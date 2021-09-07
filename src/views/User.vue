<template>
  <div>
    <p>Welcome back, {{user}}</p>
  </div>
</template>

<script>
import store from "@/store"
export default {
  name: "User",
  data() {
    return {
      user: store.user
    };
  },
};
</script>

<style scoped>
</style>