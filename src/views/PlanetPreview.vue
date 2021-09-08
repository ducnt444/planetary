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
        <h1 class="planets-name">{{ thisPlanet.name }}</h1>
        <h3 class="planets-title" :class="{ 'preview-mode': previewMode }">
          {{ thisPlanet.title }}
        </h3>
        <div v-if="previewMode" class="preview-content">
          <div
            v-for="(value, name, key) in thisPlanet.previewStats"
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
  margin: 0 auto;
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
  transition: all 1s;
  position: absolute;
  height: 70%;
  top: -20%;
  left: 10%;
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
  height: 40%;
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
.btn {
  width: 40%;
  padding: 10px 20px;
  color: rgb(230, 230, 230);
  text-shadow: 0 0 15px rgb(253, 253, 253);
}

/* ===================== preview mode ===================== */
.img.preview-mode {
  width: 150%;
  height: auto;
  top: -40%;
  left: -25%;
}
.planet-shadow.preview-mode {
  display: none;
}
.planet-text.preview-mode {
  height: 55%;
}
.planets-title.preview-mode {
  margin-bottom: 1.25rem;
}
.preview-content {
  opacity: 0.85;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
}
.preview-content-cell {
  margin-bottom: 15px;
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
.planet-btn-group.preview-mode {
  justify-content: space-between;
}
@media screen and (min-width: 375px) {
  .img.preview-mode {
    top: -35%;
    left: -25%;
  }
  .planets-title.preview-mode {
    margin-bottom: 2rem;
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
