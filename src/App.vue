<template>
  <div id="app">
    <div class="page-wrapper">
      <transition name="slide-fade" mode="out-in">
        <router-view :key="$route.path" />
      </transition>
    </div>
    <TheNavbar />
  </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar.vue";

export default {
  name: "App",
  components: {
    TheNavbar,
  },
  metaInfo: {
    title: "Planetary",
  },
};
</script>


<style>
/* 
================ general settings ================
*/
* {
  box-sizing: border-box;
}
body {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  background: transparent;
}
p:last-child {
  margin: 0;
}
#app {
  width: 100%;
  max-width: 450px;
  height: 100%;
  max-height: 950px;
  font-family: Roboto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
}
.img-fluid {
  height: 100% !important;
  object-fit: cover;
}
.page-wrapper {
  position: relative;
  width: 100%;
  height: calc(100% - 50px);
}
[v-cloak] {
  display: none;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.absolute-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/* 
================ font faces settings ================
*/
@font-face {
  font-family: Roboto;
  src: url(./assets/fonts/Roboto/Roboto-Regular.ttf);
}
@font-face {
  font-family: EarthOrbiter;
  src: url(./assets/fonts/EarthOrbiter/EarthOrbiter-YZ12.otf);
}
@font-face {
  font-family: Aware;
  src: url(./assets/fonts/AwareBold.ttf);
}
/* @font-face {
  font-family: Tourney;
  src: url(./assets/fonts/Tourney/Tourney/Tourney-Regular.ttf);
} */
@font-face {
  font-family: Agelast;
  src: url(./assets/fonts/agelast-font/Agelast-mLlAm.otf);
}

/* 
================ carousel settings ================
*/
.carousel,
.carousel-inner,
.carousel-item {
  height: 100%;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/* 
================ neon effects settings ================
*/
:root {
  --neon-blue: #08f;
  --neon-blue-flick: rgba(0, 136, 255, 0.541);
  --neon-white: rgb(248, 252, 255);
  --neon-white-flick: rgba(232, 237, 241, 0.746);
  --neon-purple: rgb(187, 31, 192);
  --neon-purple-flick: rgba(216, 19, 206, 0.746);
}

@keyframes flicking {
  0% {
    box-shadow: 0 0 3px #fff, inset 0 0 3px #fff, 0 0 8px var(--neon-blue),
      inset 0 0 8px var(--neon-blue), 0 0 15px var(--neon-blue),
      inset 0 0 15px var(--neon-blue);
  }
  50% {
    box-shadow: 0 0 3px rgba(255, 255, 255, 0.596),
      inset 0 0 3px rgba(255, 255, 255, 0.582), 0 0 8px var(--neon-blue-flick),
      inset 0 0 8px var(--neon-blue-flick), 0 0 15px var(--neon-blue-flick),
      inset 0 0 15px var(--neon-blue-flick);
  }
  100% {
    box-shadow: 0 0 3px #fff, inset 0 0 3px #fff, 0 0 8px var(--neon-blue),
      inset 0 0 8px var(--neon-blue), 0 0 15px var(--neon-blue),
      inset 0 0 15px var(--neon-blue);
  }
}

.neon-blue {
  border: #fff !important;
  animation: flicking 5s infinite reverse;
  color: #fff !important;
}

@keyframes flickingWhite {
  0% {
    box-shadow: 0 0 3px #fff, inset 0 0 3px #fff, 0 0 8px var(--neon-white),
      inset 0 0 8px var(--neon-white), 0 0 15px var(--neon-white),
      inset 0 0 15px var(--neon-white);
  }
  50% {
    box-shadow: 0 0 3px rgba(255, 255, 255, 0.596),
      inset 0 0 3px rgba(255, 255, 255, 0.582), 0 0 8px var(--neon-white-flick),
      inset 0 0 8px var(--neon-white-flick), 0 0 15px var(--neon-white-flick),
      inset 0 0 15px var(--neon-white-flick);
  }
  100% {
    box-shadow: 0 0 3px #fff, inset 0 0 3px #fff, 0 0 8px var(--neon-white),
      inset 0 0 8px var(--neon-white), 0 0 15px var(--neon-white),
      inset 0 0 15px var(--neon-white);
  }
}

.neon-white {
  border: #fff !important;
  animation: flickingWhite 5s infinite reverse;
  color: #fff !important;
}

@keyframes flickingBlack {
  0% {
    box-shadow: 0 0 3px #fff, inset 0 0 3px #fff, 0 0 8px var(--neon-purple),
      inset 0 0 8px var(--neon-purple), 0 0 15px var(--neon-purple),
      inset 0 0 15px var(--neon-purple);
  }
  50% {
    box-shadow: 0 0 3px rgba(255, 255, 255, 0.596),
      inset 0 0 3px rgba(255, 255, 255, 0.582), 0 0 8px var(--neon-purple-flick),
      inset 0 0 8px var(--neon-purple-flick), 0 0 15px var(--neon-purple-flick),
      inset 0 0 15px var(--neon-purple-flick);
  }
  100% {
    box-shadow: 0 0 3px #fff, inset 0 0 3px #fff, 0 0 8px var(--neon-purple),
      inset 0 0 8px var(--neon-purple), 0 0 15px var(--neon-purple),
      inset 0 0 15px var(--neon-purple);
  }
}

.neon-purple {
  border: #000 !important;
  animation: flickingBlack 5s infinite reverse;
  color: #000 !important;
}
</style>
