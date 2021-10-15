<template>
  <div class="planets-img-area">
    <div
      class="positioned"
      :class="dynamicClass(index)"
      v-for="(planet, index) in planets"
      :key="planet.id"
      @click="childToggle(index)"
    >
      <img
        :src="require(`@/assets/images/planets/${planet.img}`)"
        class="planet-img"
        @load="onImgLoad"
      />
      <img
        src="@/assets/images/planets/shadow-2.png"
        alt="shadow"
        class="planet-shadow"
      />
    </div>
    <div class="positioned position-icon">
      <b-icon icon="chevron-double-left" aria-hidden="true"></b-icon>
      <span class="d-inline-block mx-2">Swipe</span>
      <b-icon icon="chevron-double-right" aria-hidden="true"></b-icon>
    </div>

    <div class="arrow arrow-left non-swipeable" @click="arrowToLeft()">
      <b-icon icon="chevron-left" aria-hidden="true"></b-icon>
    </div>
    <div class="arrow arrow-right non-swipeable" @click="arrowToRight()">
      <b-icon icon="chevron-right" aria-hidden="true"></b-icon>
    </div>
  </div>
</template>
<script>
export default {
  name: "PlanetSlider",
  props: ["planets", "currentIndex"],
  computed: {},
  methods: {
    dynamicClass(planetIndex) {
      if (planetIndex === this.currentIndex) return "position-current";
      else if (planetIndex === this.currentIndex + 1) return "position-prev";
      else if (planetIndex === this.currentIndex - 1) return "position-next";
      else if (planetIndex > this.currentIndex) return "position-prepare";
      else return "position-hidden";
    },
    childToggle(index) {
      this.$emit("childToggleClickToRight", index);
    },
    arrowToLeft() {
      this.$emit("arrowToLeft");
    },
    arrowToRight() {
      this.$emit("arrowToRight");
    },
    onImgLoad: function () {
      console.log("loaded");
    },
  },
};
</script>
<style scoped>
.planets-img-area {
  width: 100%;
  height: 30%;
  position: relative;
  /* z-index: 2; */
}
@keyframes spinning {
  from {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
.planet-img {
  display: block;
  height: 100%;
  animation: spinning 60s linear infinite forwards;
}
.planet-shadow {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: -1px;
}
.positioned {
  position: absolute;
  transition: all 0.7s;
}
.position-hidden {
  display: none;
}
.position-prepare {
  top: 5px;
  left: 5px;
  height: 0%;
}
.position-prev {
  top: 15px;
  left: 15px;
  height: 20%;
  z-index: 20;
}
.position-current {
  top: 25%;
  left: 35%;
  height: 120%;
}
.position-next {
  top: 100%;
  left: 100%;
  height: 150%;
}
@keyframes blinking {
  from {
    opacity: 0.6;
  }
  to {
    opacity: 0.9;
  }
}
.position-icon {
  top: 15px;
  font-size: 20px;
  left: 50%;
  transform: translate(-50%, 0%);
  animation: blinking 1s infinite alternate;
}
@media screen and (min-width: 360px) {
  .planets-img-area {
    height: 35%;
    /* z-index: 2; */
  }
}
@media screen and (min-width: 414px) {
  .position-icon {
    font-size: 24px;
  }
}
@media screen and (min-width: 768px) {
  .position-current {
    top: 20%;
    left: 50%;
    height: 130%;
  }
  .position-next {
    top: 120%;
    left: 120%;
    height: 150%;
  }
}
@media screen and (min-width: 1366px) {
  .position-prepare {
    top: 5%;
    left: 20%;
    height: 0%;
  }
  .position-prev {
    top: 15%;
    left: 25%;
    height: 20%;
    z-index: 20;
    cursor: pointer;
  }
  .position-current {
    top: 50%;
    left: 65%;
    height: 175%;
  }
  .position-next {
    top: 220%;
    left: 100%;
    height: 255%;
  }
  .arrow {
    position: fixed;
    top: 45%;
    font-size: 80px;
    opacity: 0.45;
    cursor: pointer;
    transition: opacity 0.3s;
  }
  .arrow:hover {
    opacity: 0.85;
  }
  .arrow-left {
    left: 5%;
  }
  .arrow-right {
    right: 5%;
  }
}
@media screen and (min-width: 1920px) {
  .position-current {
    top: 45%;
    left: 65%;
    height: 175%;
  }
  .position-next {
    top: 160%;
    left: 100%;
    height: 200%;
  }
}
</style>