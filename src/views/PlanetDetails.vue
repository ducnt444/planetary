<template>
  <div
    class="page-content"
    :style="{
      'background-image':
        'url(' +
        require(`@/assets/images/planets/${thisPlanet.background}`) +
        ')',
    }"
  >
    <BackButton />

    <div class="img-area">
      <img
        :src="require(`@/assets/images/planets/${thisPlanet.img}`)"
        :alt="thisPlanet.name"
        class="planet-img"
      />
      <div class="img-area-text">
        <h1 class="planet-name">{{ thisPlanet.name }}</h1>
        <h2 class="planet-title">{{ thisPlanet.title }}</h2>
      </div>
    </div>

    <div class="info-area">
      <div class="section section-stats">
        <h4 v-for="(value, name, key) in thisPlanet.stats" :key="key">
          <span class="stats-header" v-html="name + ': '"></span>
          <span class="stats-value" v-html="value.replace('<br/>', '')"></span>
        </h4>
      </div>

      <div class="section section-description">
        <h3 class="header">Description:</h3>
        <p>
          {{ thisPlanet.description }}
        </p>
      </div>

      <div class="section section-attraction" id="attraction">
        <h3 class="header">Attractions:</h3>
        <div class="attraction-grid">
          <div
            v-for="(attraction, index) in thisPlanet.attractions"
            :key="attraction.slug"
            class="attraction-cell"
            @click="toggleModal(index)"
          >
            <img
              :src="require(`@/assets/images/planets/${attraction.img}`)"
              class="attraction-img"
              :alt="attraction.name"
            />
            <span class="attraction-name">{{ attraction.name }}</span>
          </div>
        </div>
        <b-modal v-model="modalShow" centered hide-footer
          ><img
            :src="
              require(`@/assets/images/planets/${thisPlanet.attractions[currentAttraction].img}`)
            "
            class="modal-img"
          />
          <h3 class="header header-modal">
            {{ thisPlanet.attractions[currentAttraction].name }}
          </h3>
          <p>
            {{ thisPlanet.attractions[currentAttraction].description }}
          </p>
        </b-modal>
      </div>

      <div class="section section-gallery"></div>
    </div>
  </div>
</template>

<script>
import store from "@/store.js";
import BackButton from "@/components/BackButton.vue";
export default {
  components: { BackButton },
  name: "PlanetDetails",
  data() {
    return {
      modalShow: false,
      currentAttraction: 0,
    };
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
  methods: {
    toggleModal(index) {
      this.currentAttraction = index;
      this.modalShow = !this.modalShow;
    },
  },
};
</script>

<style scoped>
.page-content {
  color: #fff;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
.img-area {
  height: 300px;
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  align-content: flex-start;
  padding-left: 15px;
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
  position: absolute;
  animation: spinning 90s linear infinite forwards;
  width: 130%;
  left: -15%;
  top: -85%;
}
.img-area-text {
  position: relative;
  z-index: 20;
}
.planet-name {
  margin: 0;
  font-size: 44px;
  letter-spacing: 5px;
  font-family: EarthOrbiter, sans-serif;
}
.planet-title {
  margin: 0;
  font-size: 24px;
  letter-spacing: 5px;
  font-family: Agelast, sans-serif;
}
.info-area {
  padding: 20px 15px;
  /* margin-top: 30px;
  border-radius: 42px;
  background-color: rgba(0, 0, 0, 0.4); */
}
.section {
  padding-bottom: 25px;
}
h4 {
  font-size: 16px;
  margin-top: 15px;
}
.stats-header {
  font-weight: 700;
}
.header {
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 10px;
}

.attraction-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}
.attraction-cell {
  position: relative;
  color: #fff;
}
/* .attraction-link {
  display: block;
  color: #fff;
} */
.attraction-img {
  border-radius: 12px;
}
.attraction-img,
.attraction-name {
  width: 100%;
  display: block;
}
.attraction-name {
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  text-align: right;
  line-height: 1.75;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  padding-right: 10px;
}
::v-deep .modal-dialog {
  margin: 0 15px;
}
::v-deep .modal-content {
  background-color: #fff;
  border-radius: 12px;
}
::v-deep .modal-header {
  padding: 5px 10px;
  border: none;
}
::v-deep .modal-body {
  padding: 0 20px 20px 20px;
  color: #000;
}
::v-deep .modal-img {
  width: 100%;
  border-radius: 12px;
}
.header-modal {
  margin: 5px 0 15px 0;
}
@media screen and (min-width: 375px) {
  .img-area {
    height: 320px;
  }
}
@media screen and (min-width: 414px) {
  .img-area {
    height: 350px;
  }
}
</style>