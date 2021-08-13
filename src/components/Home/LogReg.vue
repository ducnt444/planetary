<template>
  <div class="logreg-wrapper">
    <transition name="slide-fade">
      <div class="logreg neon-border-white" v-if="toggleLogReg">
        <img
          v-if="toggleLogReg"
          class="logo"
          src="../../assets/images/logo-white.png"
          alt="logo"
        />
        <!-- <h1 class="tourney-font text-center neon-text-white">Đăng nhập</h1> -->
        <form class="logreg-form" autocomplete="off">
          <input
            type="text"
            name="username"
            id="username"
            class="neon-border-white"
            placeholder="demo: user"
          />
          <input
            type="password"
            name="password"
            id="password"
            class="neon-border-white"
            placeholder="demo: 123"
          />
          <button type="button" class="btn login-btn neon-border-white">
            <span class="neon-text-white">Đăng nhập</span>
          </button>
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "LogReg",
  props: ["toggleLogReg"],
  data: function () {
    return {};
  },
  methods: {
    /* handleVideoEnded: function () {
      this.shouldLogoShow = true;
    }, */
  },
  mounted: function () {
    /* let vid = document.querySelector("#home-video");
    vid.playbackRate = 3; */
  },
};
</script>

<style scoped>
.logreg-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
}
.logo {
  width: 100px;
  filter: drop-shadow(0 0 35px #fff);
}
.logreg {
  width: 80%;
  height: 60%;
  color: #fff;
  padding: 15px;
  border-radius: 16px;
}
.logreg h1 {
  font-size: 32px;
  text-shadow: 0 0 0.5vw 0.8vw #f0f0f0, 0 0 0.6vw 0.8vw #438cdf,
    0 0 6vw 0.8vw #0b57bb, inset 0 0 2.5vw 0.6vw #0b57bb,
    inset 0 0 0.9vw 0.4vw #438cdf, inset 0 0 0.9vw 0.4vw #f0f0f0;
}
.logreg-form input,
input:-internal-autofill-selected {
  -webkit-background-clip: text !important;
  background-color: transparent !important;
  border: none !important;
  outline: none !important;
  display: block;
  height: 40px;
  margin: 20px auto;
  padding: 5px 10px;
  color: #fff !important;
  border-radius: 4px;
}
::placeholder {
  color: rgb(224, 224, 224);
  font-style: italic;
}
.login-btn {
  color: #fff;
}
</style>
