<template>
  <transition name="slide-fade" mode="out-in">
    <div
      class="page-content"
      v-if="isLoggedIn"
      :style="{
        'background-image':
          'url(' +
          require(`@/assets/images/planets/${currentPlanet.background}`) +
          ')',
        transition: 'all 0.7s',
      }"
    >
      <div class="screen" v-touch:swipe="swipeHandler"></div>

      <PlanetSlider
        :planets="planets"
        :currentIndex="currentPlanetIndex"
        @childToggleClickToRight="clickToRight"
      />

      <div class="planets-info-area">
        <h1 class="planets-name">
          {{ currentPlanet.name }}
        </h1>
        <h3 class="planets-title">
          {{ currentPlanet.title }}
        </h3>
        <div
          class="
            planets-symbol-area
            d-flex
            flex-row-reverse
            align-items-center
            justify-content-center
          "
        >
          <div
            v-for="(planet, index) in planets"
            :key="index"
            class="symbol-wrapper flex-center mx-1 my-1"
            :class="{ 'symbol-active': index === currentPlanetIndex }"
          >
            <img
              :src="require(`@/assets/images/planets/${planet.symbol}`)"
              class="planets-symbol"
              :class="{ 'symbol-active': index === currentPlanetIndex }"
            />
          </div>
        </div>
        <div
          class="
            attraction-img-area
            d-flex
            align-items-center
            justify-content-between
            my-2
            px-2
          "
        >
          <img
            v-for="(attraction, index) in currentPlanet.attractions"
            :key="index"
            :src="require(`@/assets/images/planets/${attraction.thumbnail}`)"
            class="attraction-img non-swipeable"
            @click="toggleModal(index)"
          />
          <b-modal v-model="modalShow" centered hide-footer hide-header
            ><img
              :src="require(`@/assets/images/planets/${currentAttraction.img}`)"
              class="modal-img"
          /></b-modal>
        </div>
        <div class="preview-content">
          <div
            v-for="(value, name, key) in currentPlanet.stats"
            :key="key"
            class="preview-stats"
          >
            <p class="cell-title" v-html="name"></p>
            <p class="cell-text" v-html="value"></p>
          </div>
        </div>
        <router-link
          :to="{
            name: 'PlanetDetails',
            params: { slug: currentPlanet.slug },
          }"
          class="btn planets-details neon-blue non-swipeable"
        >
          Explore
        </router-link>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import PlanetSlider from "../components/PlanetSlider.vue";

export default {
  name: "PlanetsList",
  components: { PlanetSlider },
  data() {
    return {
      currentAttractionIndex: 0,
      modalShow: false,
    };
  },
  computed: {
    currentPlanet() {
      return this.planets[this.currentPlanetIndex];
    },
    currentAttraction() {
      return this.currentPlanet.attractions[this.currentAttractionIndex];
    },
    ...mapState(["planets", "currentPlanetIndex"]),
    ...mapGetters(["isLoggedIn"]),
  },
  methods: {
    swipeHandler(direction) {
      if (direction === "right") {
        this.toRight();
      } else if (direction === "left") {
        this.toLeft();
      }
    },
    clickToRight(index) {
      if (index === this.currentPlanetIndex + 1) this.toRight();
    },
    toggleModal(index) {
      this.currentAttractionIndex = index;
      this.modalShow = !this.modalShow;
    },
    ...mapMutations(["toRight", "toLeft", "navbarControl"]),
  },
  mounted() {
    this.navbarControl(true);
  },
};
</script>

<style scoped>
.screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 11;
}
.non-swipeable {
  position: relative;
  z-index: 20;
}
.page-content {
  /* transition: all 0.7s; */
  background-color: rgba(0, 0, 0, 0.876);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 100%;
  width: 100%;
  color: #fff;
  position: relative;
  padding-bottom: 50px;
}

.planets-info-area {
  width: 100%;
  height: 65%;
  padding: 5px 15px 50px 15px;
  text-align: center;
  position: relative;
  /* z-index: 4; */
}

.planets-name {
  font-size: 32px;
  margin: 0;
  left: 7.5px;
  position: relative;
  letter-spacing: 15px;
  font-family: EarthOrbiter, sans-serif;
}
.planets-title {
  margin: 5px 0 0 0;
  font-size: 18px;
  font-family: Agelast, sans-serif;
  position: relative;
  left: 2.5px;
  letter-spacing: 5px;
}

.planets-symbol-area {
  margin: 5px 0 0 0;
}
.symbol-wrapper {
  padding: 3px;
  width: 25px;
  height: 25px;
  border-radius: 6px;
}
.symbol-wrapper.symbol-active {
  background-color: rgba(255, 255, 255, 0.3);
}
.planets-symbol {
  max-width: 100%;
}

.attraction-img {
  width: 30%;
  border-radius: 8px;
}

.preview-content {
  opacity: 1;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
}
.preview-stats {
  margin-bottom: 10px;
}
.cell-title {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 0px;
}
.cell-text {
  font-size: 12px;
  margin: 0;
}
.btn {
  display: block;
  padding: 5px;
  width: 80px;
  margin: 10px auto;
  font-size: 13px;
}
::v-deep .modal-dialog {
  margin: 0;
}
::v-deep .modal-content {
  background-color: transparent;
  border: none;
}
::v-deep .modal-body {
  display: flex;
  justify-content: center;
  align-content: center;
}
::v-deep .modal-img {
  width: 100%;
}
@media screen and (min-width: 360px) {
  .cell-title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 0px;
  }
  .cell-text {
    font-size: 13px;
    margin: 0;
  }
  .btn {
    display: block;
    padding: 5px;
    width: 80px;
    margin: 10px auto;
    font-size: 14px;
  }
}
@media screen and (min-width: 414px) {
  .planets-name {
    font-size: 42px;
    line-height: 1.1;
    left: 7.5px;
    letter-spacing: 15px;
  }
  .planets-title {
    margin: 0;
    font-size: 22px;
    left: 2.5px;
    letter-spacing: 5px;
  }
  .cell-title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 0px;
  }
  .cell-text {
    font-size: 14px;
    margin: 0;
  }
  .btn {
    padding: 7px;
    width: 100px;
    margin: 10px auto;
    font-size: 16px;
  }
}
</style>

