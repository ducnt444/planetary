<template>
  <div class="login-module">
    <transition name="slide-fade" mode="out-in">
      <div
        v-if="!isAttempLogin"
        key="1"
        class="d-flex flex-column align-items-center"
      >
        <div class="quotes-wrapper">
          <h1 class="quotes">
            Somewhere, <br />
            something incredible <br />
            is waiting to be known.
          </h1>
          <h2 class="author text-right">– Carl Sagan (1934 – 1996)</h2>
        </div>
        <button @click="attempLogin" class="btn-login btn neon-blue mb-4">
          Log in
        </button>
        <button class="btn-signup btn neon-white">Sign up</button>
      </div>

      <div v-else class="login-wrapper" key="2">
        <div class="login neon-blue">
          <h1>Login</h1>
          <div class="login-form">
            <input
              v-model="inputUsername"
              type="text"
              placeholder="Demo user: 'user'"
            />
            <input
              v-model="inputPassword"
              type="text"
              placeholder="Demo password: '123'"
            />
            <div
              class="
                logreg-btn-group
                d-flex
                align-items-center
                justify-content-between
              "
            >
              <b-button @click="attempLogin" variant="outline-light"
                >Back</b-button
              >
              <b-button @click="login(computedUser)" variant="outline-dark"
                >Log in</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      inputUsername: null,
      inputPassword: null,
      isAttempLogin: false,
    };
  },
  computed: {
    currentAttraction() {
      return this.planetSlug(this.slug).attractions[
        this.currentAttractionIndex
      ];
    },
    computedUser() {
      return { username: this.inputUsername, password: this.inputPassword };
    },
    ...mapGetters(["findUser"]),
  },
  methods: {
    ...mapMutations(["login"]),
    attempLogin() {
      this.isAttempLogin = !this.isAttempLogin;
    },
    submitLogin() {
      // localStore.user = this.username;
      // const redirectPath = this.$route.query.redirect || "/";
      // this.$router.push(redirectPath);
    },
  },
  mounted() {
    let url = "https://my-json-server.typicode.com/ducnt444/planetary/users";

    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // .finally(() => (this.loading = false));
  },
};
</script>

<style scoped>
.quotes-wrapper {
  width: 100%;
  padding: 15px;
  margin-bottom: 10%;
}
.quotes {
  font-size: 20px;
  font-family: Agelast;
  letter-spacing: 3px;
  position: relative;
  left: 5px;
  color: #fff;
  text-shadow: 2px 2px 15px #000000;
}
.author {
  font-size: 16px;
  color: #fff;
  margin: 0;
}
.login-wrapper {
  color: #fff;
  padding: 0 30px;
  position: relative;
  z-index: 10;
}
.login {
  padding: 20px 30px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 16px;
}
.login h1 {
  font-family: EarthOrbiter, Roboto;
  font-size: 32px;
  text-align: center;
  margin-bottom: 15px;
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
.btn {
  width: 100px;
}
.neon-blue {
  background-color: rgba(0, 0, 0, 0.301);
  color: #fff !important;
}
.btn-login-submit {
  color: #fff;
  display: block;
  width: 80px;
  margin: 20px 0 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.7);
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
