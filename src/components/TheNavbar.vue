<template>
  <div class="nav-area">
    <ul class="nav">
      <li class="nav-items">
        <router-link class="links flex-center" :to="{ name: 'Home' }">
          <img
            class="links-icon"
            src="@/assets/images/misc/home-icon-white.png"
            alt="Home"
          />
        </router-link>
      </li>
      <li class="nav-items">
        <router-link class="links flex-center" :to="{ name: 'PlanetsList' }"
          ><img
            class="links-icon"
            src="@/assets/images/misc/planets-icon-white-2.png"
            alt="Home"
        /></router-link>
      </li>
      <li class="nav-items">
        <router-link class="links flex-center" :to="{ name: 'Feed' }">
          <img
            class="links-icon"
            src="@/assets/images/misc/feed-icon-white.png"
            alt="Home"
          />
        </router-link>
      </li>
      <li class="nav-items">
        <router-link class="links flex-center" :to="{ name: 'User' }"
          ><img
            class="links-icon"
            src="@/assets/images/misc/user-icon-white.png"
            alt="Home"
        /></router-link>
      </li>
    </ul>
    <!-- <div v-else class="flex-center h-100 w-100 text-light">
      <span>Planetary &copy; 2021. Powered by </span>
      <img
        class="d-block mx-2"
        src="@/assets/images/misc/vue-logo.png"
        alt="vue js"
      />
    </div> -->
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
export default {
  name: "TheNavbar",
  computed: {
    // ...mapGetters(["isLoggedIn"]),
  },
};
</script>

<style scoped>
.active-page {
  background: rgb(93, 93, 93);
}
.nav-area {
  background: rgba(0, 0, 0, 1);
  width: 100%;
  max-width: 450px;
  height: 50px;
  z-index: 100;
  position: absolute;
  bottom: 0;
  left: 0;
}
.nav {
  width: 100%;
  height: 100%;
}
.nav-items {
  width: 25%;
  height: 100%;
}
.links,
.links-icon {
  height: 100%;
}
.links {
  padding: 15px;
}
</style>