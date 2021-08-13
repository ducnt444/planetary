<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <Homepage />
  </div>
</template>

<script>
import Homepage from "./components/Home/Homepage.vue";

export default {
  name: "App",
  components: {
    Homepage,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  height: 100vh;
  background: #000000; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #434343,
    #000000
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #434343,
    #000000
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
#app {
  width: 100%;
  max-width: 414px;
  height: 100vh;
  max-height: 896px;
  margin: 0 auto auto 0;
}
.slide-fade-enter-active {
  transition: all 0.8s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.neon-border-blue {
  box-shadow: 0 0 0.5vw 0.8vw #f0f0f0, 0 0 0.6vw 0.8vw #438cdf,
    0 0 6vw 0.8vw #0b57bb, inset 0 0 2.5vw 0.6vw #0b57bb,
    inset 0 0 0.9vw 0.4vw #438cdf, inset 0 0 0.9vw 0.4vw #f0f0f0;
  /* box-shadow: inset 0 0 25px 0 #0c6ae6, 0 0 25px 0 #0f6eeb; */
}
.neon-text-blue {
  text-shadow: 
  .1vw 0vw .25vw #f0f0f0, .2vw 0vw .25vw #f0f0f0, .4vw 0vw .25vw #f0f0f0, 

  .1vw 0vw   0vw #438cdf, .2vw 0vw   0vw #438cdf, .4vw 0vw   0vw #438cdf,
  .1vw 0vw  .1vw #438cdf, .2vw 0vw  .1vw #438cdf, .4vw 0vw  .1vw #438cdf,
  .1vw 0vw   2vw #438cdf, .2vw 0vw   2vw #438cdf, .4vw 0vw   2vw #438cdf, 

  .1vw 0vw   1vw #0b57bb, .2vw 0vw   1vw #0b57bb, .4vw 0vw   5vw #0b57bb, 
  .1vw 0vw   5vw #0b57bb, .2vw 0vw  20vw #0b57bb, .4vw 0vw  10vw #0b57bb,
  .1vw 0vw  10vw #0b57bb, .2vw 0vw  30vw #0b57bb, .4vw 0vw  10vw #0b57bb;
}

.neon-border-white {
  box-shadow: 0 0 0.5vw 0.8vw #dbdbdb, 0 0 0.6vw 0.8vw #b4b4b4,
    0 0 6vw 0.8vw #9e9e9e, inset 0 0 2.5vw 0.6vw #9e9e9e,
    inset 0 0 0.9vw 0.4vw #b4b4b4, inset 0 0 0.9vw 0.4vw #dbdbdb;
  /* box-shadow: inset 0 0 25px 0 #0c6ae6, 0 0 25px 0 #0f6eeb; */
}
.neon-text-white {
  text-shadow: 
  .1vw 0vw .25vw #dbdbdb, .2vw 0vw .25vw #dbdbdb, .4vw 0vw .25vw #dbdbdb, 

  .1vw 0vw   0vw #b4b4b4, .2vw 0vw   0vw #b4b4b4, .4vw 0vw   0vw #b4b4b4,
  .1vw 0vw  .1vw #b4b4b4, .2vw 0vw  .1vw #b4b4b4, .4vw 0vw  .1vw #b4b4b4,
  .1vw 0vw   2vw #b4b4b4, .2vw 0vw   2vw #b4b4b4, .4vw 0vw   2vw #b4b4b4, 

  .1vw 0vw   1vw #9e9e9e, .2vw 0vw   1vw #9e9e9e, .4vw 0vw   5vw #9e9e9e, 
  .1vw 0vw   5vw #9e9e9e, .2vw 0vw  20vw #9e9e9e, .4vw 0vw  10vw #9e9e9e,
  .1vw 0vw  10vw #9e9e9e, .2vw 0vw  30vw #9e9e9e, .4vw 0vw  10vw #9e9e9e;
}
@font-face {
  font-family: Roboto;
  src: url(./assets/fonts/Roboto/Roboto-Regular.ttf);
}
@font-face {
  font-family: RobotoBold;
  src: url(./assets/fonts/Roboto/Roboto-Bold.ttf);
  font-weight: bold;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: RobotoBold;
}
@font-face {
  font-family: Tourney-300;
  src: url(./assets/fonts/Tourney/Tourney/Tourney-Light.ttf);
}
.tourney-font {
  font-family: Tourney-300;
  font-weight: 300 !important;
}
</style>
