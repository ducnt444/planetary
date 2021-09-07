<template>
  <div>
    <BackButton />
    <h1>Planet:{{ thisPlanet.name }}</h1>
    <h2 class="attractions">Top attractions in {{ thisPlanet.name }}</h2>
    <div class="d-flex justify-content-center">
      <div
        v-for="attraction in thisPlanet.attractions"
        :key="attraction.slug"
        class="card"
      >
        <router-link
          :to="{
            name: 'Attraction',
            params: { attractionSlug: attraction.slug },
          }"
          >{{ attraction.name }}
        </router-link>
      </div>
    </div>
    <router-view :key="$route.path" />
  </div>
</template>

<script>
import store from "@/store.js";
import BackButton from "@/components/BackButton.vue";
export default {
  components: { BackButton },
  name: "PlanetDetails",
  data() {
    return {};
  },
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  computed: {
    thisPlanet() {
      return store.planets.find((planets) => planets.slug === this.slug);
    },
  },
};
</script>

<style scoped>
</style>