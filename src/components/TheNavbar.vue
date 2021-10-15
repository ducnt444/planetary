<template>
  <div class="nav-area">
    <ul v-if="isNavbarDisplay" class="nav">
      <li class="nav-items">
        <router-link class="links flex-center" :to="{ name: 'Home' }">
          <img
            class="links-icon"
            src="@/assets/images/misc/home-icon-white.png"
            alt="Home"
          />
          <span class="links-text">HOME</span>
        </router-link>
      </li>
      <li class="nav-items">
        <router-link class="links flex-center" :to="{ name: 'PlanetsList' }"
          ><img
            class="links-icon"
            src="@/assets/images/misc/planets-icon-white-2.png"
            alt="PlanetsList"
          />
          <span class="links-text">PLANETS</span></router-link
        >
      </li>
      <li class="nav-items">
        <router-link class="links flex-center" :to="{ name: 'Feed' }">
          <img
            class="links-icon"
            src="@/assets/images/misc/feed-icon-white.png"
            alt="Feed"
          />
          <span class="links-text">NEWS</span>
        </router-link>
      </li>
      <li class="nav-items">
        <router-link class="links flex-center" :to="{ name: 'User' }"
          ><img
            class="links-icon"
            src="@/assets/images/misc/user-icon-white.png"
            alt="User"
          />
          <span class="links-text">PROFILE</span></router-link
        >
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
import { mapState } from "vuex";
export default {
  name: "TheNavbar",
  computed: {
    ...mapState(["isNavbarDisplay"]),
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.active-page {
  background: rgb(93, 93, 93);
}
.nav-area {
  background: rgba(0, 0, 0, 0);
  width: 100%;
  height: 50px;
  z-index: 100;
  position: fixed;
  bottom: 0;
}
.nav {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 1);
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
.links-text {
  display: none;
}

@media screen and (min-width: 1366px) {
  .nav-area {
    background: transparent;
    width: 400px;
    height: 50px;
    z-index: 100;
    position: fixed;
    top: 0;
    right: 5%;
  }
  .nav {
    background: transparent;
  }
  .links-text {
    display: block;
    font-family: Aware;
    color: #fff;
    border-bottom: 2px solid transparent;
    transition: border 0.3s;
  }
  .links-icon {
    display: none;
  }
  .active-page {
    background: transparent;
  }
  .links-text:hover,
  .active-page .links-text {
    border-bottom: 2px solid #fff;
  }
}

@media screen and (min-width: 1366px) {
  .nav-area {
    width: 500px;
    height: 70px;
  }
  .links-text {
    font-size: 20px;
  }
}
</style>