<template>
  <div>
    <h1>Planet name: {{ planet.name }}</h1>
  </div>
</template>

<script>
import store from "@/store.js";
export default {
  data() {
    return {};
  },
  props: {
    slug: {
      type: String,
      required: true,
    },
/*     exploreSlug: {
      type: String,
      required: true,
    }, */
  },
  computed: {
    planet() {
      return store.planets.find((planets) => planets.slug === this.slug);
    },
/*     attraction() {
      return this.planet.attractions.find((attraction) => attraction.slug === this.attractionSlug);
    }, */
  },
};
</script>

<style scoped>
</style>