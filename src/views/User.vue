<template>
  <div
    class="
      page-content
      d-flex
      flex-column
      justify-content-center
      align-items-center
    "
  >
    <p>Welcome back</p>
    <img
      src="@/assets/images/misc/user-icon-white.png"
      alt="avatar"
      class="user-avatar"
    />

    <h3 class="user-name">{{ user }}</h3>
    <button class="neon-blue btn btn-logout">Logout</button>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "User",
  data() {
    return {
      user: store.user ? store.user : "Username",
    };
  },
};
</script>

<style scoped>
.page-content {
  color: #fff;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  background-image: url(~@/assets/images/new/121212.jpg);
  background-color: #fff;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
.user-avatar {
  width: 100px;
  border: 3px solid #fff;
  border-radius: 50%;
  padding: 10px;
}
.user-name {
  margin: 15px 0 50px 0;
}
.btn-logout {
  padding: 7px 15px;
}
</style>