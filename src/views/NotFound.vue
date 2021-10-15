<template>
  <div class="not-found-wrapper">
    <h1 class="not-found-text absolute-center text-center">Page not found</h1>
    <img
      class="character"
      src="@/assets/images/404/character.png"
      alt="character"
    />
    <div class="not-found-back">
      <router-link :to="{ name: 'Home' }" class="neon-blue"
        >Go back home</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {},
  computed: {},
};
</script>

<style scoped>
.not-found-wrapper {
  width: 100%;
  height: 100%;
  background-image: url(~@/assets/images/404/bg-new.jpg);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  position: relative;
}
.character {
  display: block;
  height: 100px;
  position: absolute;
  top: calc(50% - 50px);
  left: -100px;
  animation: spinningCharacter 2.5s 0.5s 1 linear forwards;
}
@keyframes spinningCharacter {
  from {
    transform: rotate(0deg);
    left: -100px;
  }
  to {
    transform: rotate(360deg);
    left: 100%;
  }
}
.not-found-text {
  width: 0%;
  overflow: hidden;
  color: rgba(255, 255, 255, 0.9);
  font-size: 24px;
  animation: renderText 2s 2.5s 1 steps(14, end) forwards;
  white-space: nowrap;
}
@keyframes renderText {
  from {
    width: 0ch;
  }
  to {
    width: 14ch;
  }
}
.not-found-back {
  color: rgba(255, 255, 255, 0.9);
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -65%);
  background-color: #000;
  animation: renderBack 0.7s 4.5s 1 linear forwards;
  opacity: 0;
}
.not-found-back a:hover {
  text-decoration: none;
}
.neon-blue {
  padding: 5px 10px;
  border-radius: 8px;
}
@keyframes renderBack {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@media screen and (min-width: 1920px) {
  .character {
    animation: spinningCharacter 4.5s 0.5s 1 linear forwards;
  }
  .not-found-text {
    font-size: 32px;
    animation: renderText 2s 3s 1 steps(14, end) forwards;
  }
  .not-found-back {
    animation: renderBack 0.7s 5.5s 1 linear forwards;
  }
}
</style> 