<template>
  <div>
    <h1>Attractions name: {{ attraction.name }}</h1>
    <h3>Attractions details:</h3>
    <p>{{ attraction.description }}</p>
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
    attractionSlug: {
      type: String,
      required: true,
    },
  },
  computed: {
    planet() {
      return store.planets.find((planets) => planets.slug === this.slug);
    },
    attraction() {
      return this.planet.attractions.find((attraction) => attraction.slug === this.attractionSlug);
    },
  },
};
</script>

<style scoped>
</style>