<template>
  <div class="home-loading">
    <transition name="fade">
      <div v-if="isPreparing" class="loading-text">
        <span>Loading </span>
        <b-spinner
          style="width: 20px; height: 20px"
          label="Loading..."
        ></b-spinner>
      </div>
      <button
        v-else
        @click="$emit('ready')"
        class="ready-btn btn neon-blue absolute-center"
      >
        Ready set go!
      </button>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Loading",
  data() {
    return {
      isPreparing: true,
    };
  },
/*   methods: {
    completePreparing: function () {},
  }, */
  mounted: function () {
    setTimeout(() => {
      this.isPreparing = false;
    }, 2000);
  },
};
</script>

<style scoped>
.home-loading {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000;
  color: #fff;
  z-index: 11;
  position: absolute;
  top: 0;
  left: 0;
}
.ready-btn {
  color: #fff;
}
</style>
