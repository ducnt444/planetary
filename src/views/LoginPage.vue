<template>
  <div class="login-wrapper">
    <transition name="fade">
      <LoadingInitial
        v-if="!isLoggedIn && !isFinishPreparing"
        @ready="stopLoadingAndLoadMedia"
      />
    </transition>

    <div class="login-ready">
      <div class="login-content">
        <div class="login-upper flex-center">
          <img
            class="logo"
            alt="logo"
            src="@/assets/images/misc/logo-white.png"
          />
        </div>
        <div class="login-lower">
          <transition name="slide-fade" mode="out-in">
            <div
              v-if="!mode"
              class="initial-content d-flex flex-column align-items-center"
            >
              <div class="quotes-wrapper">
                <h1 class="quotes">
                  Somewhere, <br />
                  something incredible <br />
                  is waiting to be known.
                </h1>
                <h2 class="author text-right">– Carl Sagan (1934 – 1996)</h2>
              </div>
              <button
                @click="attempt('Log In')"
                class="btn-login btn neon-blue mb-4"
              >
                Log in
              </button>
              <button
                @click="attempt('Sign Up')"
                class="btn-signup btn neon-white"
              >
                Sign up
              </button>
            </div>
            <LogRegModule v-else @clickBack="attempt()" :mode="mode" />
          </transition>
        </div>
      </div>

      <video class="login-bg absolute-center" ref="videoRef" loop muted>
        <source
          src="@/assets/videos/home/home-bg-7-min2.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <audio ref="audioRef" loop>
        <source src="@/assets/audio/Hope-shorten.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div class="audio-control" :class="{ 'audio-playing': isPlaying }">
        <span v-if="isPlaying">Now playing: "Hope" by Justin E. Bell</span>
        <button @click="audioControl()" class="audio-toggler">
          <b-icon
            icon="
          volume-mute-fill"
            v-if="isPlaying"
          ></b-icon>
          <b-icon
            icon="
          volume-off-fill"
            v-else
          ></b-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingInitial from "@/components/LoadingInitial.vue";
import LogRegModule from "@/components/LogRegModule.vue";
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  name: "Login",
  components: { LoadingInitial, LogRegModule },
  data() {
    return {
      mode: null,
      isPlaying: true,
    };
  },
  computed: {
    ...mapState(["isFinishPreparing"]),
    ...mapGetters(["isLoggedIn"]),
  },
  methods: {
    attempt(action) {
      if (action) this.mode = action;
      else {
        this.errorLogSign(false);
        this.mode = null;
      }
    },
    loadMedia: function () {
      // this.$refs.videoRef.playbackRate = 0.75;
      this.$refs.videoRef.play();
      this.$refs.audioRef.play();
    },
    stopLoadingAndLoadMedia: function () {
      this.finishPreparing();
      this.loadMedia();
    },
    audioControl: function () {
      this.isPlaying = !this.isPlaying;
      this.$refs.audioRef.paused
        ? this.$refs.audioRef.play()
        : this.$refs.audioRef.pause();
    },
    ...mapMutations([
      "stopLoading",
      "finishPreparing",
      "errorLogSign",
      "navbarControl",
    ]),
  },
  created: function () {
    this.navbarControl(false);
  },
  destroyed: function () {
    this.navbarControl(true);
  },
};
</script>

<style scoped>
.login-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.login-ready {
  height: 100%;
  width: 100%;
  position: relative;
}
.login-bg {
  z-index: 101;
  width: auto;
}
.login-upper {
  width: 100%;
  height: 40%;
}
.logo {
  display: block;
  width: 150px;
}
.login-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
  z-index: 501;
  background-color: rgba(0, 0, 0, 0.1);
}
.login-lower {
  width: 100%;
  height: 60%;
}
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
  color: rgba(255, 255, 255, 0.897);
  margin: 0;
}
.btn {
  width: 100px;
}

.audio-control {
  position: absolute;
  bottom: 2px;
  right: 2px;
  z-index: 502;
  color: #fff;
}
.audio-toggler {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.5);
  background-color: transparent;
  border-radius: 0;
  padding: 6px 8.5px;
  margin-left: 10px;
}
.audio-text {
  font-style: italic;
}
.audio-playing {
  animation: blinking 1.5s infinite alternate;
}
.audio-playing .audio-toggler {
  color: rgba(255, 255, 255, 1);
  border: 1px solid rgba(255, 255, 255, 1);
}
@media screen and (min-width: 360px) {
  .logo {
    width: 180px;
  }
}
@media screen and (min-width: 414px) {
  .logo {
    width: 200px;
  }
}
</style>
