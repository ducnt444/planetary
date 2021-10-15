<template>
  <div class="page-content">
    <div
      class="
        content
        d-flex
        flex-column
        align-items-center
        justify-content-center
      "
    >
      <!-- <div class="logo-wrapper flex-center">
        <img
          src="@/assets/images/misc/logo-white.png"
          alt="Planetary logo"
          class="logo"
        />
      </div> -->

      <div class="avatar-wrapper flex-center">
        <img
          src="@/assets/images/misc/user-icon-white.png"
          alt="avatar"
          class="user-avatar neon-blue"
        />
      </div>

      <h2 class="user-name">
        &nbsp; {{ currentUser.username ? currentUser.username : "" }} &nbsp;
      </h2>

      <div class="booking-list-wrapper neon-blue">
        <div v-if="currentUser.bookings.length === 0" class="booking-empty">
          <p>Currently no plans yet</p>
          <router-link
            :to="{
              name: 'PlanetsList',
            }"
            class="btn btn-explore"
          >
            Explore
          </router-link>
        </div>
        <div v-else>
          <div class="booking-item booking-item-header">
            <span class="booking-order"> # </span>
            <span class="booking-planet"> Planet </span>
            <span class="booking-date"> Flight date </span>
            <span class="booking-number"> Passengers </span>
          </div>
          <ul class="booking-list p-0">
            <li
              v-for="(booking, index) in currentUser.bookings"
              :key="index"
              class="booking-item"
            >
              <span class="booking-order">
                {{ index + 1 }}
              </span>
              <span class="booking-planet">
                {{ booking.planet }}
              </span>
              <span class="booking-date">
                {{ booking.date.split("-").reverse().join("-") }}
              </span>
              <span class="booking-number">
                {{ booking.number }}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <button class="neon-blue btn btn-logout" @click="logoutAction">
        Logout
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "User",
  data() {
    return {
      // user: localStore.user ? localStore.user : "Username",
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    ...mapMutations(["loadingAsync", "navbarControl"]),
    ...mapActions(["logoutAction"]),
  },
  mounted() {
    this.navbarControl(true);

    this.$store.watch(
      () => {
        return this.$store.state.logoutToggler;
      },
      () => {
        setTimeout(() => {
          this.loadingAsync(false);
          this.$router.push("/login").catch(() => {});
        }, 2000);
      },
      {
        deep: true,
      }
    );
  },
  destroyed: function () {
    this.navbarControl(false);
  },
};
</script>

<style scoped>
.page-content {
  width: 100%;
  height: 100%;
}
.content {
  color: #fff;
  padding: 15px;
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
  background-image: url(~@/assets/images/user/new-bg.jpg);
  background-color: #fff;
  background-size: cover;
  background-repeat: no-repeat;
  animation: movingBG 40s linear infinite alternate;
}
@keyframes movingBG {
  from {
    background-position: left center;
  }
  to {
    background-position: right center;
  }
}

.logo-wrapper {
  width: 80px;
}
.logo {
  width: 100%;
}
.avatar-wrapper {
  width: 80px;
  margin: 30px 0 5px 0;
}
.user-avatar {
  width: 100%;
  border-radius: 50%;
  padding: 10px;
}
.user-name {
  margin: 0;
}
.btn-logout {
  padding: 7px 15px;
}

.booking-empty {
  padding: 20px;
  text-align: center;
}
.btn-explore {
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.76);
  font-size: 14px;
}

.booking-list-wrapper {
  list-style-type: none;
  padding: 10px;
  width: 100%;
  max-width: 500px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 16px;
  margin: 20px 0;
}

.booking-list {
  overflow-y: auto;
  max-height: 20vh;
  margin: 0;
}

.booking-item {
  padding: 10px 0;
  display: flex;
  font-size: 14px;
}
.booking-item-header {
  /* border-top-left-radius: 16px;
  border-top-right-radius: 16px; */
  font-weight: 700;
  /* padding-top: 0; */
}
.booking-item:last-child {
  /* border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px; */
}
.booking-item:hover {
  background-color: rgba(225, 225, 225, 0.3);
}
.booking-item span {
  text-align: center;
}
.booking-order {
  width: 10%;
}
.booking-planet {
  width: 30%;
}
.booking-date {
  width: 30%;
}
.booking-number {
  width: 30%;
}
@media screen and (min-width: 360px) {
  .logo-wrapper {
    width: 100px;
  }
  .booking-list {
    max-height: 25vh;
  }
}
@media screen and (min-width: 414px) {
  .logo-wrapper {
    width: 120px;
  }
  .booking-list-wrapper {
    margin: 30px 0;
  }
  .booking-list {
    max-height: 30vh;
  }
  .booking-item {
    font-size: 16px;
  }
}
@media screen and (min-width: 768px) {
  .logo {
    width: 150px;
  }
  .avatar-wrapper {
    width: 100px;
  }
}
@media screen and (min-width: 1366px) {
  .logo-wrapper {
  }
  .logo {
    width: 80px;
  }
  .avatar-wrapper {
    width: 80px;
  }
  /* width */
  ::-webkit-scrollbar {
    width: 5px;
    position: relative;
    right: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}
@media screen and (min-width: 1920px) {
  .logo-wrapper {
    align-items: flex-end;
  }
  .logo {
    width: 120px;
  }
  .avatar-wrapper {
    align-items: flex-end;
    width: 100px;
  }
  .user-name {
  }
}
</style>