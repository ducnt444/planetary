<template>
  <div
    class="page-content"
    :style="{
      'background-image':
        'url(' +
        require(`@/assets/images/planets/${planetSlug(slug).background}`) +
        ')',
    }"
  >
    <BackButton />

    <div class="img-area">
      <img
        :src="require(`@/assets/images/planets/${planetSlug(slug).img}`)"
        :alt="planetSlug(slug).name"
        class="planet-img"
      />
      <div class="img-area-text">
        <h1 class="planet-name">{{ planetSlug(slug).name }}</h1>
        <h2 class="planet-title">{{ planetSlug(slug).title }}</h2>
      </div>
    </div>

    <div class="info-area">
      <div class="section section-stats">
        <h4 v-for="(value, name, key) in planetSlug(slug).stats" :key="key">
          <span class="stats-header" v-html="name + ': '"></span>
          <span class="stats-value" v-html="value.replace('<br/>', '')"></span>
        </h4>
      </div>

      <div class="section section-description">
        <h3 class="header">Description:</h3>
        <p>
          {{ planetSlug(slug).description }}
        </p>
      </div>

      <div class="section section-flights">
        <h3 class="header">Flights:</h3>
        <img
          :src="
            require(`@/assets/images/planets/${planetSlug(slug).flights.img}`)
          "
          :alt="planetSlug(slug).flights.name"
          class="flights-img"
        />
        <p class="mt-3">
          {{ planetSlug(slug).flights.desc }}
        </p>
      </div>

      <div class="section section-attraction" id="attraction">
        <h3 class="header">Attractions:</h3>
        <div class="attraction-grid">
          <div
            v-for="(attraction, index) in planetSlug(slug).attractions"
            :key="attraction.slug"
            class="attraction-cell"
            @click="toggleModalAttraction(index)"
          >
            <img
              :src="require(`@/assets/images/planets/${attraction.img}`)"
              class="attraction-img"
              :alt="attraction.name"
            />
            <span class="attraction-name">{{ attraction.name }}</span>
          </div>
        </div>

        <b-modal
          v-model="showModalAttraction"
          modal-class="attraction-modal"
          centered
          hide-footer
          ><img
            :src="require(`@/assets/images/planets/${currentAttraction.img}`)"
            class="modal-img"
          />
          <h3 class="header header-modal-text">
            {{ currentAttraction.name }}
          </h3>
          <p class="text-justify">
            {{ currentAttraction.description }}
          </p>
        </b-modal>
      </div>

      <button
        @click="toggleModalBooking"
        class="btn neon-blue d-block mx-auto my-3"
      >
        Fly me to {{ planetSlug(slug).name }} !
      </button>

      <b-modal
        v-model="showModalBooking"
        centered
        hide-footer
        :modal-class="[{ success: isSuccess }, 'booking-modal']"
      >
        <Booking
          :currentPlanet="planetSlug(slug)"
          @childToggleSuccess="parrentToggleSuccess"
        />
      </b-modal>
    </div>
  </div>
</template>

<script>
import BackButton from "@/components/BackButton.vue";
import Booking from "@/components/Booking.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: { BackButton, Booking },
  name: "PlanetDetails",
  data() {
    return {
      showModalAttraction: false,
      showModalBooking: false,
      currentAttractionIndex: 0,
      isSuccess: false,
    };
  },
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  computed: {
    currentAttraction() {
      return this.planetSlug(this.slug).attractions[
        this.currentAttractionIndex
      ];
    },
    ...mapGetters(["planetSlug"]),
  },
  methods: {
    toggleModalAttraction(index) {
      this.currentAttractionIndex = index;
      this.showModalAttraction = !this.showModalAttraction;
    },
    toggleModalBooking() {
      this.showModalBooking = !this.showModalBooking;
    },
    parrentToggleSuccess() {
      this.isSuccess = true;
    },
    ...mapMutations(["navbarControl"]),
  },
  mounted() {
    this.$root.$on("bv::modal::hide", () => {
      this.isSuccess = false;
    });
    this.navbarControl(true);
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
  padding-bottom: 50px;
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

.flights-img {
  display: block;
  max-width: 500px;
  margin: auto;
  width: 100%;
  border-radius: 16px;
}
.attraction-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}
.attraction-cell {
  position: relative;
  color: #fff;
  cursor: pointer;
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
  max-width: 420px;
  margin: 0 15px;
}
::v-deep .modal-content {
  background-color: rgba(0, 0, 0, 1);
  border-radius: 12px;
  border: #fff !important;
  animation: flicking 5s infinite reverse;
  color: #fff !important;
  transition: all 0.7s;
}
::v-deep .modal-header {
  padding: 5px 10px;
  border: none;
}
::v-deep .modal-body {
  padding: 0;
  color: #fff;
}
::v-deep .modal-img {
  width: 100%;
  border-radius: 12px;
}
::v-deep .close {
  color: #fff;
  opacity: 1;
}
.header-modal-text {
  margin: 5px 0 15px 0;
}
::v-deep .attraction-modal .modal-body {
  padding: 5px 20px 25px 20px;
}

::v-deep .booking-modal .modal-content {
  height: 325px;
}
::v-deep .success .modal-content {
  background-image: url(~@/assets/images/misc/see-you.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: left;
  /* background-position: center bottom; */
}
/* .price-wrapper {
  margin: 15px auto;
  padding: 15px;
  width: fit-content;
  background-color: #000;
  border-radius: 12px;
}

.logo {
  width: 60px;
  display: block;
  margin-right: 15px;
}
.planetary {
  font-family: Aware;
  margin: 0;
  font-size: 20px;
} */
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
@media screen and (min-width: 768px) {
  .planet-img {
    width: 100%;
    left: 0%;
    top: -145%;
  }
  .img-area {
    padding-left: 30px;
  }
  .info-area {
    padding: 20px 30px;
  }
  h4 {
    font-size: 18px;
  }
  ::v-deep .modal-dialog {
    max-width: 420px;
    margin: auto;
  }
}
@media screen and (min-width: 1366px) {
  .img-area,
  .info-area {
    max-width: 1140px;
    margin: auto;
  }
  .img-area {
    height: auto;
    padding-top: 100px;
  }

  .planet-img {
    width: 450px;
    top: 100px;
    left: 55%;
  }
  .info-area {
    padding: 20px 30px;
  }
  .section:not(:first-child) {
    padding-bottom: 75px;
  }
  .section-description p {
    width: 50%;
  }
  .section-flights {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .header {
    width: 100%;
  }
  .flights-img {
    margin: 0 30px 0 0;
    width: 40%;
  }
  .section-flights p {
    width: 50%;
  }
  .attraction-grid {
    gap: 30px;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .attraction-name {
    font-size: 20px;
  }
}
@media screen and (min-width: 1920px) {
  .img-area,
  .info-area {
    max-width: 1320px;
  }
  .planet-img {
    width: 600px;
    top: 120px;
    left: 55%;
  }
  .planet-name {
    font-size: 62px;
  }
  .planet-title {
    font-size: 32px;
  }
  h4 {
    font-size: 20px;
  }
  ::v-deep .modal-dialog {
    max-width: 600px;
  }
  ::v-deep .attraction-modal .modal-body {
    padding: 5px 35px 35px 35px;
    font-size: 18px;
  }
  .header-modal-text {
    margin: 10px 0 20px 0;
    font-size: 28px;
  }
  .btn {
    font-size: 20px;
  }
}
</style>