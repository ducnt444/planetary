<template>
  <div class="audio-control" :class="{ 'audio-playing': isPlaying }">
    <span v-if="isPlaying" class="audio-text"
      >Now playing: "Hope" by Justin E. Bell</span
    >
    <button @click="audioToggler" class="audio-toggler btn"></button>
      <b-icon
        v-if="isPlaying"
        icon="
          volume-off-fill"
      ></b-icon>
      <b-icon
        v-else
        icon="
          volume-mute-fill"
      ></b-icon>
    </button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "AudioControl",
  data() {
    return {
      isPlaying: true,
    };
  },
  computed: {},
  methods: {
    audioToggler: function () {
      this.isPlaying = !this.isPlaying;
      this.$refs.audioRef.paused
        ? this.$refs.audioRef.play()
        : this.$refs.audioRef.pause();
    },
  },

};
</script>
<style scoped>
.home-wrapper {
  width: 100%;
  height: 100%;
}
.home {
  width: 100%;
  height: 100%;
  background-image: url(~@/assets/images/home/bg2.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  animation: movingBG 45s linear infinite alternate;
}
@keyframes movingBG {
  from {
    background-position: left center;
  }
  to {
    background-position: right center;
  }
}
/* .home-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  animation: bgAnimation 2s linear infinite alternate;
}
@keyframes bgAnimation {
  from {
    filter: brightness(100%) contrast(100%) saturate(80%);
  }
  to {
    filter: brightness(120%) contrast(120%) saturate(110%);
  }
} */
.home-logo {
  height: 20%;
  position: relative;
  z-index: 2;
}
.logo {
  width: 120px;
}
.home-content {
  /* flex-grow: 1; */
  margin: 0 15px;
  padding: 15px;
  position: relative;
  z-index: 2;
  font-size: 14px;
  background-color: rgba(0, 0, 0, 0.486);
  border-radius: 16px;
  max-height: 70vh;
  overflow: scroll;
}
h1 {
  font-size: 20px;
  text-align: left;
  width: 100%;
}
.planetary {
  font-family: Aware;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 5px 0;
}
a {
  color: #0099ff;
  text-decoration: underline;
}
.audio-control {
  position: absolute;
  bottom: 50px;
  right: 0;
  color: rgba(255, 255, 255, 1);
}
.audio-toggler {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 0;
  padding: 6px 8.5px;
  margin-left: 10px;
}
.audio-toggler:focus {
  box-shadow: none;
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
</style>
