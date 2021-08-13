<template>
  <div class="home-wrapper">
    <video
      id="home-video"
      src="../../assets/images/home-video.mp4"
      autoplay
      muted
      @ended="handleVideoEnded"
    ></video>
    <LogReg :toggleLogReg="toggleLogReg" />
  </div>
</template>

<script>
import LogReg from "./LogReg.vue";

export default {
  name: "Home",
  components: {
    LogReg,
  },
  data: function () {
    return {
      toggleLogReg: false,
    };
  },
  methods: {
    handleVideoEnded: function () {
      this.toggleLogReg = true;
    },
  },
  mounted: function () {
    let vid = document.querySelector("#home-video");
    vid.playbackRate = 4;
  },
};
</script>

<style scoped>
.home-wrapper {
  position: relative;
}
video {
  max-width: 100%;
}
</style>
