<template>
  <div class="home-wrapper">
    a
    <img class="planet-bg" src="../../assets/images/planets/mercury/44444.jpg" alt="">
  </div>
</template>
<script>

export default {
  name: "Homepage",
  components: {
    
  },
  data: function () {
    return {
      
    };
  },
  methods: {

  },
};
</script>

<style scoped>
.home-wrapper {
  position: relative;
  width: 100%;
  max-width: 414px;
  height: 100%;
}
.planet-bg {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
