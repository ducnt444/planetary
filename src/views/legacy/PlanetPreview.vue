<template>
  <div class="planet-wrapper">
    <img
      :src="require(`@/assets/images/planets/${thisPlanet.img}`)"
      alt=""
      class="planet-img"
    />
    <img
      src="@/assets/images/planets/shadow.png"
      alt=""
      class="planet-shadow"
    />
    <div class="planet-text">
      <h1 class="planets-name">{{ thisPlanet.name }}</h1>
      <h3 class="planets-alias">{{ thisPlanet.text }}</h3>
      <router-link
        :to="{ name: 'PlanetDetails', params: { slug: thisPlanet.slug } }"
      >
        <button class="btn planets-explore neon-blue">Explore</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlanetPreview",
  props: ["thisPlanet"],
  computed: {
    /*     bgImage() {
      return require("@/assets/" + this.thisPlanet.background);
    }, */
    /*     renderBackground() {
      return {
        backgroundImage: `url(${require("@/assets/" +
          this.thisPlanet.background)})`,
      };
    }, */
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
@keyframes spinning {
  from {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
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
  height: 70%;
  position: absolute;
  top: -20%;
  left: 10%;
}
.planet-img {
  animation: spinning 120s linear infinite forwards;
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
  height: 40%;
  text-align: center;
}
.planets-name {
  margin: 0;
  position: relative;
  left: 7.5px;
  letter-spacing: 15px;
  font-family: EarthOrbiter, sans-serif;
  animation: name-flicking 10s infinite reverse;
}
.planets-alias {
  margin: 0.25rem 0 4rem 0;
  font-size: 1.25rem;
  font-family: Agelast, sans-serif;
  position: relative;
  left: 2.5px;
  letter-spacing: 5px;
  animation: name-flicking 3s infinite reverse;
}
.planets-explore {
  padding: 10px 20px;
  color: rgb(230, 230, 230);
  text-shadow: 0 0 15px rgb(253, 253, 253);
}
</style>
