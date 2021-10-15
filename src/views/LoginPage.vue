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
                class="btn-login btn neon-blue mb-4 mb-md-5 mb-lg-4 mb-xl-4"
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

      <video
        class="login-bg absolute-center"
        ref="videoRef"
        loop
        muted
      >
        <source src="@/assets/videos/home/bg-1920-5.mp4" type="video/mp4" />
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
      this.$refs.videoRef.playbackRate = 0.75;
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
  mounted: function () {
    if (this.isPlaying) this.loadMedia();
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
  /* position: fixed;
  right: 0;
  bottom: 0; */
  min-width: 100%;
  min-height: 100%;
}
.login-upper {
  width: 100%;
  height: 20%;
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
  background-color: rgba(0, 0, 0, 0.15);
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
  color: rgba(255, 255, 255, 0.825);
  margin: 0;
}
.btn {
  width: 100px;
}

.audio-control {
  position: absolute;
  bottom: 52px;
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
  .login-upper {
    height: 40%;
  }
}
@media screen and (min-width: 414px) {
  .logo {
    width: 200px;
  }
}

@media screen and (min-width: 768px) {
  .login-upper {
    height: 30%;
  }
  .login-lower {
    height: 70%;
  }
  .quotes-wrapper {
    padding: 15px 50px;
  }
  .quotes {
    font-size: 36px;
    text-align: center;
    margin-bottom: 30px;
  }
  .author {
    font-size: 28px;
  }
  .btn {
    font-size: 28px;
    width: 150px;
    color: rgba(255, 255, 255, 0.9);
  }
}

@media screen and (min-width: 1366px) {
  .logo {
    width: 125px;
  }
  .login-upper {
    height: 25%;
  }
  .login-lower {
    height: 75%;
  }
  .quotes-wrapper {
    padding: 15px 0;
    max-width: 900px;
    margin-bottom: 5%;
  }
  .quotes {
    font-size: 32px;
    text-align: center;
    margin-bottom: 20px;
  }
  .author {
    font-size: 24px;
  }
  .btn {
    font-size: 20px;
    width: 120px;
    border-radius: 8px;
  }
}

@media screen and (min-width: 1920px) {
  .logo {
    width: 200px;
  }
  .login-upper {
    height: 40%;
  }
  .login-lower {
    height: 60%;
  }
  .quotes-wrapper {
    max-width: 800px;
    margin-bottom: 3%;
  }
  .quotes {
    font-size: 42px;
    text-align: center;
    margin-bottom: 20px;
  }
  .author {
    font-size: 32px;
  }
  .btn {
    font-size: 24px;
    width: 150px;
  }
  .btn-login {
    margin-bottom: 35px !important;
  }
  .audio-playing {
    display: flex;
    align-items: center;
  }
  .audio-playing span,
  .audio-toggler {
    font-size: 24px;
  }
}
</style>
