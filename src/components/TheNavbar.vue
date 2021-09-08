<template>
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
</template>

<script>
export default {
  name: "TheNavbar",
};
</script>

<style scoped>
.active-page {
  background: rgb(93, 93, 93);
}
.nav {
  background: #000;
  width: 100%;
  max-width: 414px;
  height: 50px;
  z-index: 1000;
  position: fixed;
  bottom: 0;
  left: 0;
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