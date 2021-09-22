<template>
  <div class="logreg-wrapper">
    <div class="logreg-module neon-blue">
      <transition name="fade" mode="out-in">
        <div v-if="!currentUser.username" class="anonymous-user" key="1">
          <h1>{{ mode }}</h1>
          <div class="login-form">
            <input
              v-model="inputUsername"
              type="text"
              placeholder="Demo user: 'user'"
              class="mb-3"
            />
            <input
              v-model="inputPassword"
              type="text"
              placeholder="Demo password: '123'"
              class="mb-1"
            />
            <div
              class="
                error-text-wrapper
                d-flex
                align-items-center
                justify-content-end
              "
            >
              <span v-show="isAttemptLoginError" class="error-text"
                >Wrong username or password</span
              >
            </div>
            <div
              class="
                logreg-btn-group
                d-flex
                align-items-center
                justify-content-between
                mt-2
              "
            >
              <b-button
                @click="$emit('clickBack')"
                class="back-btn flex-center p-0"
                variant="outline-light"
                ><b-icon icon="arrow-left" aria-hidden="true"></b-icon
              ></b-button>
              <b-button
                @click="
                  mode === 'Log In' ? login(computedUser) : signup(computedUser)
                "
                class="submit-btn btn neon-white"
                >Confirm</b-button
              >
            </div>
          </div>
        </div>
        <div v-else class="logged-user flex-center flex-column" key="2">
          <h4 class="mb-3">Welcome, {{ currentUser.username }}</h4>
          <h6 class="m-0">Redirecting...</h6>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  name: "LogRegModule",
  props: ["mode"],
  data() {
    return {
      inputUsername: null,
      inputPassword: null,
    };
  },
  computed: {
    computedUser() {
      return { username: this.inputUsername, password: this.inputPassword };
    },
    ...mapState(["users", "currentUser", "isAttemptLoginError"]),
    ...mapGetters(["isLoggedIn"]),
  },
  methods: {
    redirect() {
      console.log("redirected");
      // const redirectPath = this.$route.query.redirect || "/";
      // this.$router.push(redirectPath);
    },
    ...mapMutations(["login", "signup"]),
  },
  created() {
    this.$store.watch(
      () => {
        return this.$store.getters.isLoggedIn; // could also put a Getter here
      },
      () => {
        setTimeout(() => {
          this.$router.push("/");
        }, 2000);
      },
      //Optional Deep if you need it
      {
        deep: true,
      }
    );
  },
};
</script>

<style scoped>
.logreg-wrapper {
  width: 100%;
  padding: 0 30px;
}
.logreg-module {
  color: #fff;
  padding: 0 30px;
  position: relative;
  z-index: 10;
  padding: 20px 30px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 16px;
  height: 270px;
}
h1 {
  font-family: EarthOrbiter, Roboto;
  font-size: 32px;
  text-align: center;
  margin-bottom: 15px;
}
input {
  display: block;
  width: 100%;
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
.error-text-wrapper {
  height: 25px;
}
.error-text {
  color: rgb(255, 52, 52);
  font-size: 14px;
  font-weight: 700;
}

.neon-blue {
  background-color: rgba(0, 0, 0, 0.301);
  color: #fff !important;
}
.back-btn {
  width: 40px;
  height: 38px;
}
.submit-btn {
  width: 100px;
  background-color: transparent;
}

.logged-user {
  height: 100%;
  width: 100%;
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
