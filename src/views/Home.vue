<template>
  <div class="home-wrapper d-flex flex-column">
    <div class="home">
      <div class="home-logo flex-center">
        <img
          class="logo"
          src="@/assets/images/misc/logo-white.png"
          alt="planetary-logo"
        />
      </div>
      <transition name="fade">
        <div
          v-if="isModalOpen"
          class="home-content neon-blue d-flex flex-center"
        >
          <div class="cotent d-flex flex-column align-items-center">
            <h1>
              About
              <span class="planetary">PLANETARY</span>
            </h1>
            <ul>
              <li class="content-text">
                - <span class="planetary">PLANETARY</span> is a personal demo
                project, powered by <strong>Vue.JS</strong> (with Vue router,
                Vuex, Bootstrap-Vue)
              </li>
              <li class="content-text">
                - Upon exiting the app, all data will be reset after
                <strong>30 mins</strong>.
              </li>
            </ul>
            <h1>My other projects:</h1>
            <ul>
              <li class="content-text">
                -
                <a href="https://ducnt444.github.io/halo/" target="_blank"
                  >HALO</a
                >: demo camera shop website (static content, as practicing Pug,
                CSS, JS)
              </li>
              <li class="content-text">
                -
                <a href="https://changeable-list.herokuapp.com/" target="_blank"
                  >Changeable list</a
                >: demo list manager (practicing DOM manipulation, Jquery, basic
                uses of REST API)
              </li>
              <li class="content-text">
                -
                <a href="https://ducnt444.github.io/react-task-manager/" target="_blank"
                  >Task manager</a
                >: demo task manager (practicing ReactJS)
              </li>
            </ul>
            <button @click="toggleModal" class="btn neon-white">Close</button>
          </div>
        </div>
      </transition>
    </div>

    <div class="audio-control" :class="{ 'audio-playing': !isMuted }">
      <span v-if="!isMuted" class="audio-text"
        >Now playing: "Hope" by Justin E. Bell</span
      >
      <button @click="audioToggler" class="audio-toggler btn">
        <b-icon
          v-if="isMuted"
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

    <audio ref="audioRef" loop>
      <source src="@/assets/audio/Hope-shorten-2.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      isModalOpen: true,
      isMuted: true,
    };
  },
  computed: {},
  methods: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },

    audioToggler: function () {
      this.isMuted = !this.isMuted;
      this.$refs.audioRef.paused
        ? this.$refs.audioRef.play()
        : this.$refs.audioRef.pause();
    },
    ...mapMutations(["navbarControl"]),
  },
  mounted: function () {
    this.navbarControl(true);
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
  background-image: url(~@/assets/images/home/new-bg-min.jpg);
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
  max-width: 600px;
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

@media screen and (min-width: 768px) {
  .logo {
    width: 175px;
  }
  .home-content {
    margin: auto;
    padding: 30px;
    font-size: 18px;
    max-height: 70vh;
    overflow: scroll;
  }
  h1 {
    font-size: 28px;
  }
}

@media screen and (min-width: 1366px) {
  .home-logo {
    height: 25%;
  }
  .logo {
    width: 150px;
  }
  .home {
    background-image: url(~@/assets/images/home/new-bg.jpg);
    background-size: auto;
  }
  .home-content {
    font-size: 16px;
    max-height: none;
    overflow: auto;
  }
  h1 {
    font-size: 24px;
  }
}

@media screen and (min-width: 1920px) {
  .home-logo {
    height: 30%;
  }
  .logo {
    width: 175px;
  }
  .home-content {
    font-size: 18px;
  }
  h1 {
    font-size: 28px;
  }
  .audio-control {
    right: 15px;
  }
}

@media screen and (min-width: 2500px) {
  .home {
    background-image: url(~@/assets/images/home/new-bg-max.jpg);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .home-logo {
    height: 20%;
  }
  .logo {
    width: 250px;
  }
  .home-content {
    margin: 0 auto;
  }
}
</style>
