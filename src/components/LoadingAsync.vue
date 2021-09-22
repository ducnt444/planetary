<template>
  <transition name="fade">
    <div v-if="isLoadingAsync" class="loading-async">
      <div class="layer layer-4">
        <div class="layer layer-3">
          <div class="layer layer-2">
            <div class="layer layer-1"></div>
          </div>
        </div>
      </div>
      <span class="layer loading-text absolute-center flex-center"
        >Loading...</span
      >
    </div>
  </transition>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "LoadingAsync",
  data() {
    return {};
  },
  computed: { ...mapState(["isLoadingAsync"]) },
};
</script>

<style scoped>
.loading-async {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0);
  color: #fff;
  z-index: 1000;
  position: absolute;
  top: 0;
  left: 0;
}
.loading-text {
  border-radius: 50%;
}
@keyframes spnining {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
}
.layer {
  width: 120px;
  height: 120px;
  border: 1px solid #fff;
}
.layer-1 {
  animation: spnining 4s 0.5s infinite forwards;
}
.layer-2 {
  animation: spnining 4s 0.6s infinite forwards;
}
.layer-3 {
  animation: spnining 4s 0.7s infinite forwards;
}
.layer-4 {
  animation: spnining 4s 0.8s infinite forwards;
}
</style>
