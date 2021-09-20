<template>
  <div class="home-wrapper">
    <transition name="fade">
      <Loading v-if="isLoading" @ready="stopLoading" />
    </transition>
    <div key="1" class="home">
      <video class="home-bg absolute-center" ref="videoRef" loop muted>
        <source
          src="@/assets/videos/home/home-bg-7-min3.mp4"
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

      <div class="home-content">testKey</div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Home",
  components: { Loading },
  computed: {
    ...mapState(["isLoading", "isMuted", "testKey"]),
  },
  methods: {
    ...mapMutations(["loadingControl"]),
    loadMedia: function () {
      this.$refs.videoRef.playbackRate = 0.5;
      this.$refs.videoRef.play();
      this.$refs.audioRef.play();
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
.home-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.home {
  height: 100%;
  width: 100%;
}
.home-bg {
  /*   position: absolute;
  top: 0;
  left: 0; */
  z-index: 1;
}
.home-content {
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
}
.muteVolume {
  position: fixed;
  bottom: 50px;
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
</style>
