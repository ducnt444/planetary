<template>
  <div class="login-wrapper">

    <transition name="fade">
      <Loading v-if="isLoading" @ready="stopLoading" />
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
          <transition name="fade">
            <div v-if="isLoggedIn">Content</div>
            <Login v-else />
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
      <button
        @click="muteVolume()"
        class="muteVolume btn"
        :class="{ active: isMuted }"
      >
        <b-icon
          icon="
          volume-mute-fill"
        ></b-icon>
      </button>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import Login from "@/components/Login.vue";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Home",
  components: { Loading, Login },
  computed: {
    ...mapState(["isLoading", "isMuted", "testKey", "isLoggedIn"]),
  },
  methods: {
    ...mapMutations(["loadingControl"]),
    loadMedia: function () {
      this.$refs.videoRef.playbackRate = 0.75;
      this.$refs.videoRef.play();
      // this.$refs.audioRef.play();
    },
    stopLoading: function () {
      this.loadingControl();
      this.loadMedia();
    },
    muteVolume: function () {
      // console.log(this.$refs.audioRef);
      this.$refs.audioRef.paused
        ? this.$refs.audioRef.play()
        : this.$refs.audioRef.pause();
    },
  },
  mounted: function () {
    if (!this.isLoading) {
      this.loadMedia();
    }
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
}
.login-bg {
  z-index: 1;
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
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.1);
}
.login-lower {
  width: 100%;
  height: 60%;
}
.muteVolume {
  position: absolute;
  bottom: 0px;
  right: 0px;
  z-index: 3;
  color: #fff;
  font-size: 24px;
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 0;
  opacity: 0.7;
}
.muteVolume:hover,
.muteVolume.active {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.45);
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
