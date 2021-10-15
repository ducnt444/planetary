<template>
  <button class="back-btn flex-center" @click="goBack">
    <b-icon icon="arrow-left" aria-hidden="true"></b-icon>
  </button>
</template>

<script>
export default {
  methods: {
    goBack: function () {
      return this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.back-btn {
  position: fixed;
  top: 15px;
  left: 15px;
  width: 40px;
  height: 40px;
  font-size: 28px;
  font-weight: 700;
  z-index: 20;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.4);
  border: none;
  border-radius: 8px;
}
@media screen and (min-width: 1366px) {
  .back-btn {
    top: 40px;
    left: calc(50vw - 650px);
    width: 50px;
    height: 50px;
    font-size: 32px;
  }
}
</style>