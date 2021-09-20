<template>
  <div class="planet-wrapper">
    <img
      :src="require(`@/assets/images/planets/${thisPlanet.img}`)"
      alt=""
      class="planet-img img"
      :class="{ 'preview-mode': previewMode }"
    />
    <img
      src="@/assets/images/planets/shadow.png"
      alt=""
      class="planet-shadow img"
      :class="{ 'preview-mode': previewMode }"
    />
    <div class="planet-text" :class="{ 'preview-mode': previewMode }">
      <div>
        <h1 class="planets-name" :class="{ 'preview-mode': previewMode }">
          {{ thisPlanet.name }}
        </h1>
        <h3 class="planets-title" :class="{ 'preview-mode': previewMode }">
          {{ thisPlanet.title }}
        </h3>
        <div v-if="previewMode" class="preview-content">
          <div
            v-for="(value, name, key) in thisPlanet.stats"
            :key="key"
            class="preview-content-cell"
          >
            <p class="cell-title" v-html="name"></p>
            <p class="cell-text" v-html="value"></p>
          </div>
        </div>
        <div
          class="planet-btn-group d-flex align-items-center"
          :class="{ 'preview-mode': previewMode }"
        >
          <button @click="toPreviewMode" class="btn planets-explore neon-blue">
            <b-icon v-if="previewMode" icon="caret-left-fill"></b-icon>
            {{ backOrExplore }}
          </button>
          <router-link
            v-if="previewMode"
            :to="{ name: 'PlanetDetails', params: { slug: thisPlanet.slug } }"
            class="btn planets-details neon-blue"
          >
            Details
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlanetPreview",
  props: ["thisPlanet"],
  data() {
    return {
      previewMode: false,
    };
  },
  computed: {
    backOrExplore() {
      if (this.previewMode) return " Back";
      else return "Explore";
    },
  },
  methods: {
    toPreviewMode() {
      this.previewMode = !this.previewMode;
      this.$emit("childToggleControls");
    },
  },
};
</script>


<style>
.carousel-control-prev,
.carousel-control-next {
  width: 10%;
  z-index: 9999;
}
.carousel-control-next {
  width: 10%;
  justify-content: flex-start;
}
.carousel-control-prev {
  width: 10%;
  justify-content: flex-end;
}
.carousel-wrapper {
  height: 100%;
}
.carousel-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.carousel-indicators {
  position: fixed;
  bottom: 60px;
  margin: auto;
}
.carousel-indicators li {
  background-color: transparent;
  /* background-color: rgba(225, 225, 225, 0.2);
  border-radius: 12px; */
  border: none;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: 12px;
  margin: 0 10px;
  height: 25px;
  width: 25px;
}
.carousel-indicators li:nth-child(1) {
  background-image: url("~@/assets/images/planets/Mercury/symbol-active.png");
}
.carousel-indicators li:nth-child(2) {
  background-image: url("~@/assets/images/planets/Venus/symbol-active.png");
}
.carousel-indicators li:nth-child(3) {
  background-image: url("~@/assets/images/planets/Mars/symbol-active.png");
}
@media screen and (min-width: 414px) {
  .carousel-indicators li {
    height: 30px;
    width: 30px;
  }
}
</style>

<style scoped>
.planet-wrapper {
  overflow: hidden;
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  -webkit-box-shadow: inset -13px 18px 34px 2px #000000;
  box-shadow: inset -13px 18px 34px 2px #000000;
}
.planet-img,
.planet-shadow {
  /* transition: width 1s, top 1s, left 1s, opacity 1s, visibility 1s; */
  transition: all 1s;
  position: absolute;
  height: 80%;
  top: -35%;
  left: 10%;
  /* opacity: 1;
  visibility: visible; */
}
.planet-img {
  animation: spinning 120s linear infinite forwards;
}
@keyframes spinning {
  from {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
@keyframes name-flicking {
  0% {
    opacity: 0.9;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 0.9;
  }
}
.planet-text {
  min-width: 290px;
  padding-bottom: 70px;
  /* height: 40%; */
  text-align: center;
  transition: all 1s;
}
.planets-name {
  margin: 0;
  position: relative;
  left: 7.5px;
  letter-spacing: 15px;
  font-family: EarthOrbiter, sans-serif;
  animation: name-flicking 10s infinite reverse;
}
.planets-title {
  margin: 0.25rem 0 4rem 0;
  font-size: 1.25rem;
  font-family: Agelast, sans-serif;
  position: relative;
  left: 2.5px;
  letter-spacing: 5px;
  animation: name-flicking 3s infinite reverse;
}

.planet-btn-group {
  justify-content: center;
  transition: all 0.5s;
}
.planet-btn-group .btn {
  padding: 5px 15px;
  color: rgb(230, 230, 230);
  text-shadow: 0 0 15px rgb(253, 253, 253);
}

/* ===================== preview mode ===================== */
.img.preview-mode {
  height: 100%;
  top: 0%;
  left: 10%;
}
.planet-shadow.preview-mode {
  opacity: 0;
  visibility: hidden;
  /* display: none; */
}
.planet-text.preview-mode {
  background-color: rgba(0, 0, 0, 0.35);
  padding: 15px 15px 25px 15px;
  z-index: 20;
  width: 100%;
}
/* .planet-text.preview-mode .planets-name {
  left: 0;
} */
.planets-name.preview-mode,
.planets-title.preview-mode {
  animation: none;
}

.planets-title.preview-mode {
  margin-bottom: 0.75rem;
}
.preview-content {
  opacity: 1;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
}
.preview-content-cell {
  margin-bottom: 15px;
}
.cell-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 0px;
}
.cell-text {
  font-size: 14px;
  margin: 0;
}
.planet-btn-group.preview-mode .planets-explore {
  margin-right: 50px;
}
@media screen and (min-width: 375px) {
  .planet-text {
    padding: 15px 15px 70px 15px;
  }
}
@media screen and (min-width: 414px) {
  .planet-text {
    padding: 15px 15px 90px 15px;
  }
  /* ===================== preview mode ===================== */
  .planets-title.preview-mode {
    margin-bottom: 1rem;
  }
  .preview-content-cell {
    margin-bottom: 20px;
  }
  .cell-title {
    font-size: 20px;
    margin-bottom: 5px;
  }
  .cell-text {
    font-size: 16px;
  }
}
</style>
