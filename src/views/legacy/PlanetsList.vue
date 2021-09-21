<template>
  <div class="carousel-wrapper">
    <b-carousel
      id="carousel-1"
      :controls="controls"
      :interval="interval"
      :indicators="indicators"
      :no-touch="noTouch"
      background="#ababab"
      label-next=""
      label-prev=""
    >
      <b-carousel-slide
        v-for="eachPlanet in planets"
        v-bind:key="eachPlanet.id"
        :img-src="require('@/assets/' + eachPlanet.background)"
      >
        <PlanetPreview :thisPlanet="eachPlanet" @childToggleControls="parentToggleControls" />
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
import localStore from "@/localStore.js";
import PlanetPreview from "@/views/PlanetPreview.vue";

export default {
  name: "planets-list",
  components: { PlanetPreview },
  data: function () {
    return {
      interval: 0,
      indicators: true,
      controls: true,
      noTouch: false,
      planets: localStore.planets,
    };
  },
  methods: {
    parentToggleControls() {
      this.controls = !this.controls;
      this.noTouch = !this.noTouch;
      this.indicators = !this.indicators;
    },
  },
  mounted() {
    this.interval = 0; // stop carousel
  },
};
</script>

<style scoped>
</style>



