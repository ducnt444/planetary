<template>
  <transition name="fade">
    <div
      v-if="isLoadingInitial || isLoadingAsync"
      :class="{
        'loading-initial': isLoadingInitial,
        'loading-async': isLoadingAsync,
      }"
      class="loading"
    >
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
  computed: { ...mapState(["isLoadingAsync", "isLoadingInitial"]) },
};
</script>

<style scoped>
.loading {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  z-index: 10000;
  position: absolute;
  top: 0;
  left: 0;
}
.loading-initial {
  background-color: rgba(0, 0, 0, 1);
}
.loading-async {
  background-color: rgba(0, 0, 0, 0.65);
}
.loading-text {
  border-radius: 50%;
}
@keyframes spnining {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(120deg);
  }
}
.layer {
  width: 120px;
  height: 120px;
  border: 1px solid #fff;
}
.layer-1 {
  animation: spnining 4s 0.25s infinite forwards;
}
.layer-2 {
  animation: spnining 4s 0.4s infinite forwards;
}
.layer-3 {
  animation: spnining 4s 0.5s infinite forwards;
}
.layer-4 {
  animation: spnining 4s 0.6s infinite forwards;
}
</style>
