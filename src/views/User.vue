<template>
  <div class="page-content">
    <div
      class="
        content
        d-flex
        flex-column
        justify-content-center
        align-items-center
      "
    >
      <img
        src="@/assets/images/misc/logo-white.png"
        alt="Planetary logo"
        class="logo"
      />
      <img
        src="@/assets/images/misc/user-icon-white.png"
        alt="avatar"
        class="user-avatar neon-blue"
      />

      <h2 class="user-name">{{ currentUser.username }}</h2>

      <div class="booking-list-wrapper neon-blue">
        <div v-if="bookings.length === 0" class="booking-empty">
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
              v-for="(booking, index) in bookings"
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
                {{ booking.date }}
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
    ...mapState(["bookings", "currentUser"]),
  },
  methods: {
    ...mapMutations(["loadingAsync"]),
    ...mapActions(["logoutAction"]),
  },
  mounted() {
    this.$store.watch(
      () => {
        return this.$store.state.currentUser;
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
  background-image: url(~@/assets/images/user/user-bg.jpg);
  background-color: #fff;
  background-size: 750px;
  background-repeat: no-repeat;
  animation: movingBG 45s linear infinite alternate;
}
@keyframes movingBG {
  from {
    background-position: left center;
  }
  to {
    background-position: right center;
  }
}
.logo {
  width: 100px;
  display: block;
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translate(-50%, -5%);
}

.user-avatar {
  width: 80px;
  border: 3px solid #fff;
  border-radius: 50%;
  padding: 10px;
}
.user-name {
  margin: 10px 0 20px 0;
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
  padding: 0;
  margin-bottom: 45px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 16px;
}

.booking-list {
  overflow-x: scroll;
  max-height: 35vh;
  margin: 0;
}

.booking-item {
  padding: 10px;
  display: flex;
  font-size: 14px;
}
.booking-item-header {
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  font-weight: 700;
}
.booking-item:last-child {
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
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
</style>