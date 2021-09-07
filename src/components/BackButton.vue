<template>
  <button class="back-btn" @click="goBack">
    <b-icon icon="arrow-left" aria-hidden="true"></b-icon>
  </button>
</template>

<script>
export default ({
  methods: {
    goBack: function() {
      return this.$router.go(-1)
    }
  }
})
</script>
