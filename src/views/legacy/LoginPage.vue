<template>
  <div class="login-page">
    <img class="logo" alt="logo" src="../assets/images/misc/logo-white.png" />
    <div class="login neon-blue">
      <h1>Login</h1>
      <div class="login-form">
        <input v-model="username" type="text" placeholder="Demo user: 'user'" />
        <input
          v-model="password"
          type="text"
          placeholder="Demo password: '123'"
        />
        <button @click="login" class="btn btn-login">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
import localStore from "@/localStore";
export default {
  name: "Login",
  data: function () {
    return {
      username: null,
      password: null,
    };
  },
  methods: {
    login() {
      localStore.user = this.username;
      const redirectPath = this.$route.query.redirect || "/";
      this.$router.push(redirectPath);
    },
  },
};
</script>

<style scoped>
img {
  max-width: 200px;
}
.login-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url("~@/assets/images/LoginPage/bg10.webp");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  /*   position: relative;
  z-index: 2000; */
}
.login {
  margin-top: 10%;
  padding: 30px 50px;
  width: 80%;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 16px;
}
.login h1 {
  font-family: EarthOrbiter, Roboto;
  font-size: 50px;
  text-align: center;
  margin-bottom: 30px;
}
.login-form input {
  display: block;
  width: 100%;
  margin-bottom: 15px;
  border-radius: 8px;
  background: transparent;
  height: 40px;
  padding-left: 15px;
  color: #fff;
}
::-webkit-input-placeholder {
  color: #fff;
}
:-ms-input-placeholder {
  color: #fff;
}
::placeholder {
  color: #fff;
}
.btn-login {
  color: #fff;
  display: block;
  margin: 20px 0 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.5);
}
@media screen and (min-width: 360px) {
  .logo {
    width: 180px;
  }
  .login h1 {
    font-size: 40px;
    margin-bottom: 20px;
  }
}
@media screen and (min-width: 414px) {
  .logo {
    width: 200px;
  }
  .login h1 {
    font-size: 50px;
    margin-bottom: 30px;
  }
}
</style>